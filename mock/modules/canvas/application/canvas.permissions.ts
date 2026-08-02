import type { AppOrm } from '@mock/infra/orm';
import type { ServiceResult } from '@mock/shared';
import type {CanvasMember, ChangeCanvasMemberRolePayload, Invite, RemoveMemberPayload, RevokeInvitePayload} from '@src/common/api/graphql/__generated__';

import { failure, success, toNumberId, toStringId } from '@mock/shared';
import {
  
  
  
  MemberRole
  
  
} from '@src/common/api/graphql/__generated__';

import { mapCanvasMember, mapInvite } from './canvas.mapper';
import { canRevokeInvite, getMember, hasAtLeast, roleRank } from '../domain/canvas.member-policy';

class CanvasPermissions {
  // ======================================
  // Invite
  // ======================================
  static inviteUser(
    canvasId: string,
    email: string,
    role: MemberRole,
    userId: string,
    myEmail: string,
    orm: AppOrm
  ): ServiceResult<Invite> {
    const cId = toNumberId(canvasId);
    const uId = toNumberId(userId);

    if (myEmail === email) return failure('Cannot invite self', 'CANNOT_INVITE_SELF');

    const member = getMember(orm, cId, uId);
    if (!member) return failure('Access denied', 'ACCESS_DENIED');

    if (!hasAtLeast(member.role, MemberRole.Admin))
      return failure('INSUFFICIENT_PERMISSIONS', 'INSUFFICIENT_PERMISSIONS');

    if (role === MemberRole.Owner) return failure('Cannot invite owner directly', 'INVALID_ROLE');

    const existingInvites = orm.invites.findFirst({
      canvasId: cId,
      email
    });

    if (existingInvites) return failure('Invite already exists', 'INVITE_ALREADY_EXISTS');

    const targetUser = orm.users.findFirst({
      email
    });

    const existingMember = orm.canvasMembers.findFirst({
      canvasId: cId,
      userId: targetUser?.id
    });

    if (existingMember) return failure('ALREADY_MEMBER', 'ALREADY_MEMBER');

    const invite = orm.invites.create({
      email,
      userId: targetUser?.id ?? null,
      inviterId: uId,
      role,
      boardId: null,
      canvasId: cId,
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

    if (!invite.canvasId) return failure('INVALID_RESOURCE', 'INVALID_RESOURCE');

    const member = getMember(orm, invite.canvasId, uId);
    if (!member) return failure('Access denied', 'ACCESS_DENIED');

    if (!canRevokeInvite(member, invite, uId))
      return failure('INSUFFICIENT_PERMISSIONS', 'INSUFFICIENT_PERMISSIONS');

    orm.invites.delete(invite.id);

    return success({
      resourceId: toStringId(invite.canvasId),
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

    const target = orm.canvasMembers.findById(mId);
    if (!target) return failure('Member not found', 'MEMBER_NOT_FOUND');

    const current = getMember(orm, target.canvasId, uId);
    if (!current) return failure('Access denied', 'ACCESS_DENIED');

    const removedWasSelf = target.userId === uId;

    if (target.role === MemberRole.Owner) {
      const owners = orm.canvasMembers.findMany({
        canvasId: target.canvasId,
        role: MemberRole.Owner
      });

      if (owners.length <= 1)
        return failure('CANNOT_REMOVE_LAST_OWNER', 'CANNOT_REMOVE_LAST_OWNER');
    }

    if (!removedWasSelf && roleRank[current.role] <= roleRank[target.role])
      return failure('INSUFFICIENT_PERMISSIONS', 'INSUFFICIENT_PERMISSIONS');

    orm.canvasMembers.delete(target.id);

    return success({
      resourceId: toStringId(target.canvasId),
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
  ): ServiceResult<ChangeCanvasMemberRolePayload> {
    const mId = toNumberId(memberId);
    const uId = toNumberId(userId);

    const target = orm.canvasMembers.findById(mId);
    if (!target) return failure('Member not found', 'MEMBER_NOT_FOUND');

    const current = getMember(orm, target.canvasId, uId);
    if (!current) return failure('Access denied', 'ACCESS_DENIED');

    const updatedMembers: CanvasMember[] = [];

    if (current.role === MemberRole.Owner) {
      if (newRole === MemberRole.Owner && target.userId !== uId) {
        orm.canvasMembers.update(current.id, { role: MemberRole.Admin });
        orm.canvasMembers.update(target.id, { role: MemberRole.Owner });

        const updatedCurrent = orm.canvasMembers.findById(current.id)!;
        const updatedTarget = orm.canvasMembers.findById(target.id)!;

        updatedMembers.push(
          mapCanvasMember(orm, updatedCurrent, uId, updatedCurrent.role),
          mapCanvasMember(orm, updatedTarget, uId, updatedCurrent.role)
        );
      } else {
        if (target.role === MemberRole.Owner && newRole !== MemberRole.Owner) {
          const owners = orm.canvasMembers.findMany({
            canvasId: target.canvasId,
            role: MemberRole.Owner
          });

          if (owners.length <= 1)
            return failure('CANNOT_DOWNGRADE_LAST_OWNER', 'CANNOT_DOWNGRADE_LAST_OWNER');
        }

        orm.canvasMembers.update(target.id, { role: newRole });
        const updatedTarget = orm.canvasMembers.findById(target.id)!;

        updatedMembers.push(mapCanvasMember(orm, updatedTarget, uId, current.role));
      }

      return success({
        canvasId: toStringId(target.canvasId),
        updatedMembers
      });
    }

    if (
      current.role === MemberRole.Admin &&
      target.role === MemberRole.Member &&
      newRole === MemberRole.Admin
    ) {
      orm.canvasMembers.update(target.id, { role: MemberRole.Admin });
      const updatedTarget = orm.canvasMembers.findById(target.id)!;

      updatedMembers.push(mapCanvasMember(orm, updatedTarget, uId, current.role));

      return success({
        canvasId: toStringId(target.canvasId),
        updatedMembers
      });
    }

    return failure('INSUFFICIENT_PERMISSIONS', 'INSUFFICIENT_PERMISSIONS');
  }
}

export { CanvasPermissions };
