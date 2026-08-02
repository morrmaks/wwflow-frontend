import type { AppOrm, ModelOf } from '@mock/infra/orm';
import type {CanvasListItem, CanvasMember, Invite} from '@src/common/api/graphql/__generated__';

import { toStringId } from '@mock/shared';
import {
  
  
  
  MemberRole
} from '@src/common/api/graphql/__generated__';

import { hasAtLeast, roleRank } from '../domain/canvas.member-policy';

function mapInvite(invite: ModelOf<'invites'>, canRevoke: boolean): Invite {
  return {
    __typename: 'Invite',
    id: toStringId(invite.id),
    email: invite.email,
    role: invite.role,
    expiresAt: invite.expiresAt,
    canRevoke
  };
}

function mapCanvasMember(
  orm: AppOrm,
  member: ModelOf<'canvasMembers'>,
  currentUserId: number,
  currentUserRole: MemberRole
): CanvasMember {
  const user = orm.users.findById(member.userId)!;

  const isSelf = member.userId === currentUserId;
  const isHigher = roleRank[currentUserRole] > roleRank[member.role];

  return {
    __typename: 'CanvasMember',
    id: toStringId(member.id),
    role: member.role,
    isSelf,
    canRemove: isSelf || isHigher,
    canChangeRole: isHigher,
    availableRoles:
      currentUserRole === MemberRole.Owner
        ? Object.values(MemberRole)
        : Object.values(MemberRole).filter((r) => isHigher && r !== MemberRole.Owner),
    user: {
      __typename: 'User',
      id: toStringId(user.id),
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl
    }
  };
}

function mapCanvasListItem(
  orm: AppOrm,
  canvas: ModelOf<'canvas'>,
  membership: ModelOf<'canvasMembers'>
): CanvasListItem {
  const myRole = membership.role;

  return {
    __typename: 'CanvasListItem',
    id: toStringId(canvas.id),
    title: canvas.title,
    previewUrl: canvas.previewUrl,
    updatedAt: canvas.updatedAt,
    membersCount: orm.canvasMembers.findMany({ canvasId: canvas.id }).length,
    myRole,
    myMemberId: toStringId(membership.id),
    canEdit: hasAtLeast(myRole, MemberRole.Admin),
    canDelete: myRole === MemberRole.Owner,
    canManagePermissions: hasAtLeast(myRole, MemberRole.Admin)
  };
}

export { mapCanvasListItem, mapCanvasMember, mapInvite };
