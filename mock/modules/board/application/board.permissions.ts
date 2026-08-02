import type { AppOrm } from '@mock/infra/orm';
import type { ServiceResult } from '@mock/shared';
import type {
  BoardMember,
  ChangeBoardMemberRolePayload,
  Invite,
  RemoveMemberPayload,
  RevokeInvitePayload
} from '@src/common/api/graphql/__generated__';

import { failure, success, toNumberId, toStringId } from '@mock/shared';
import { MemberRole } from '@src/common/api/graphql/__generated__';

import { mapBoardMember, mapInvite } from './board.mapper';
import { canRevokeInvite, getMember, hasAtLeast, roleRank } from '../domain/board.permissions-utils';

class BoardPermissions {
  // ======================================
  // Invite
  // ======================================
  static inviteUser(
    boardId: string,
    email: string,
    role: MemberRole,
    userId: string,
    myEmail: string,
    orm: AppOrm
  ): ServiceResult<Invite> {
    const bId = toNumberId(boardId);
    const uId = toNumberId(userId);

    if (myEmail === email) return failure('Cannot invite self', 'CANNOT_INVITE_SELF');

    const member = getMember(orm, bId, uId);
    if (!member) return failure('Access denied', 'ACCESS_DENIED');

    if (!hasAtLeast(member.role, MemberRole.Admin))
      return failure('INSUFFICIENT_PERMISSIONS', 'INSUFFICIENT_PERMISSIONS');

    if (role === MemberRole.Owner) return failure('Cannot invite owner directly', 'INVALID_ROLE');

    const existingInvites = orm.invites.findFirst({
      boardId: bId,
      email
    });

    if (existingInvites) return failure('Invite already exists', 'INVITE_ALREADY_EXISTS');

    const targetUser = orm.users.findFirst({
      email
    });

    const existingMember = orm.boardMembers.findFirst({
      boardId: bId,
      userId: targetUser?.id
    });

    if (existingMember) return failure('ALREADY_MEMBER', 'ALREADY_MEMBER');

    const invite = orm.invites.create({
      email,
      userId: targetUser?.id ?? null,
      inviterId: uId,
      role,
      canvasId: null,
      boardId: bId,
      token: `invite-${Date.now()}-${Math.random()}`,
      expiresAt: new Date(Date.now() + 7 * 86400000).toISOString(),
      acceptedAt: null,
      createdAt: new Date().toISOString()
    });

    return success(mapInvite(invite, canRevokeInvite(member, invite, uId)));
  }

  // ======================================
  // Revoke Invite
  // ======================================

  static revokeInvite(
    inviteId: string,
    userId: string,
    orm: AppOrm
  ): ServiceResult<RevokeInvitePayload> {
    const iId = toNumberId(inviteId);
    const uId = toNumberId(userId);

    const invite = orm.invites.findById(iId);
    if (!invite) return failure('Invite not found', 'INVITE_NOT_FOUND');

    if (invite.acceptedAt) return failure('Invite already accepted', 'INVITE_ALREADY_ACCEPTED');

    if (!invite.boardId) return failure('INVALID_RESOURCE', 'INVALID_RESOURCE');

    const member = getMember(orm, invite.boardId, uId);
    if (!member) return failure('Access denied', 'ACCESS_DENIED');

    if (!canRevokeInvite(member, invite, uId))
      return failure('INSUFFICIENT_PERMISSIONS', 'INSUFFICIENT_PERMISSIONS');

    orm.invites.delete(invite.id);

    return success({
      resourceId: toStringId(invite.boardId),
      inviteId: toStringId(invite.id)
    });
  }

  // ======================================
  // Remove Member
  // ======================================

  static removeMember(
    memberId: string,
    userId: string,
    orm: AppOrm
  ): ServiceResult<RemoveMemberPayload> {
    const mId = toNumberId(memberId);
    const uId = toNumberId(userId);

    const target = orm.boardMembers.findById(mId);
    if (!target) return failure('Member not found', 'MEMBER_NOT_FOUND');

    const current = getMember(orm, target.boardId, uId);
    if (!current) return failure('Access denied', 'ACCESS_DENIED');

    const removedWasSelf = target.userId === uId;

    if (target.role === MemberRole.Owner) {
      const owners = orm.boardMembers.findMany({
        boardId: target.boardId,
        role: MemberRole.Owner
      });

      if (owners.length <= 1)
        return failure('CANNOT_REMOVE_LAST_OWNER', 'CANNOT_REMOVE_LAST_OWNER');
    }

    if (!removedWasSelf && roleRank[current.role] <= roleRank[target.role])
      return failure('INSUFFICIENT_PERMISSIONS', 'INSUFFICIENT_PERMISSIONS');

    orm.boardMembers.delete(target.id);

    return success({
      resourceId: toStringId(target.boardId),
      removedMemberId: toStringId(mId),
      removedWasSelf
    });
  }

  // ======================================
  // Change Role
  // ======================================

  static changeRole(
    memberId: string,
    newRole: MemberRole,
    userId: string,
    orm: AppOrm
  ): ServiceResult<ChangeBoardMemberRolePayload> {
    const mId = toNumberId(memberId);
    const uId = toNumberId(userId);

    const target = orm.boardMembers.findById(mId);
    if (!target) return failure('Member not found', 'MEMBER_NOT_FOUND');

    const current = getMember(orm, target.boardId, uId);
    if (!current) return failure('Access denied', 'ACCESS_DENIED');

    const updatedMembers: BoardMember[] = [];

    if (current.role === MemberRole.Owner) {
      if (newRole === MemberRole.Owner && target.userId !== uId) {
        orm.boardMembers.update(current.id, { role: MemberRole.Admin });
        orm.boardMembers.update(target.id, { role: MemberRole.Owner });

        const updatedCurrent = orm.boardMembers.findById(current.id)!;
        const updatedTarget = orm.boardMembers.findById(target.id)!;

        updatedMembers.push(
          mapBoardMember(orm, updatedCurrent, uId, updatedCurrent.role),
          mapBoardMember(orm, updatedTarget, uId, updatedCurrent.role)
        );
      } else {
        if (target.role === MemberRole.Owner && newRole !== MemberRole.Owner) {
          const owners = orm.boardMembers.findMany({
            boardId: target.boardId,
            role: MemberRole.Owner
          });

          if (owners.length <= 1)
            return failure('CANNOT_DOWNGRADE_LAST_OWNER', 'CANNOT_DOWNGRADE_LAST_OWNER');
        }

        orm.boardMembers.update(target.id, { role: newRole });
        const updatedTarget = orm.boardMembers.findById(target.id)!;

        updatedMembers.push(mapBoardMember(orm, updatedTarget, uId, current.role));
      }

      return success({
        boardId: toStringId(target.boardId),
        updatedMembers
      });
    }

    if (
      current.role === MemberRole.Admin &&
      target.role === MemberRole.Member &&
      newRole === MemberRole.Admin
    ) {
      orm.boardMembers.update(target.id, { role: MemberRole.Admin });
      const updatedTarget = orm.boardMembers.findById(target.id)!;

      updatedMembers.push(mapBoardMember(orm, updatedTarget, uId, current.role));

      return success({
        boardId: toStringId(target.boardId),
        updatedMembers
      });
    }

    return failure('INSUFFICIENT_PERMISSIONS', 'INSUFFICIENT_PERMISSIONS');
  }
}

export { BoardPermissions };
