import type { AppOrm, ModelOf } from '@mock/infra/orm';

import { MemberRole } from '@src/common/api/graphql/__generated__';

const roleRank: Record<MemberRole, number> = {
  OWNER: 3,
  ADMIN: 2,
  MEMBER: 1
};

function hasAtLeast(role: MemberRole, min: MemberRole) {
  return roleRank[role] >= roleRank[min];
}

function canRevokeInvite(
  member: ModelOf<'boardMembers'>,
  invite: ModelOf<'invites'>,
  currentUserId: number
) {
  return (
    hasAtLeast(member.role, MemberRole.Admin) ||
    invite.inviterId === currentUserId ||
    invite.userId === currentUserId
  );
}

function getMember(orm: AppOrm, boardId: number, userId: number) {
  return orm.boardMembers.findFirst({ boardId, userId });
}

export { canRevokeInvite, getMember, hasAtLeast, roleRank };
