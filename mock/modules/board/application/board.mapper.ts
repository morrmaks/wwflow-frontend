import type { AppOrm, ModelOf } from '@mock/infra/orm';
import type {
  BoardCard,
  BoardColumn,
  BoardListItem,
  BoardMember,
  Invite,
} from '@src/common/api/graphql/__generated__';

import { toStringId } from '@mock/shared';
import { MemberRole } from '@src/common/api/graphql/__generated__';

import { hasAtLeast, roleRank } from '../domain/board.permissions-utils';

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

function mapBoardCard(card: ModelOf<'cards'>): BoardCard {
  return {
    __typename: 'BoardCard' as const,
    id: toStringId(card.id),
    title: card.title,
    completed: card.completed,
    position: card.position
  };
}

function mapBoardColumn(column: ModelOf<'columns'>, cards: BoardCard[]): BoardColumn {
  return {
    __typename: 'BoardColumn' as const,
    id: toStringId(column.id),
    title: column.title,
    position: column.position,
    cards
  };
}

function mapBoardMember(
  orm: AppOrm,
  member: ModelOf<'boardMembers'>,
  currentUserId: number,
  currentUserRole: MemberRole
): BoardMember {
  const user = orm.users.findById(member.userId)!;

  const isSelf = member.userId === currentUserId;
  const isHigher = roleRank[currentUserRole] > roleRank[member.role];

  return {
    __typename: 'BoardMember',
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

function mapBoardListItem(
  orm: AppOrm,
  board: ModelOf<'boards'>,
  membership: ModelOf<'boardMembers'>
): BoardListItem {
  const myRole = membership.role;

  return {
    __typename: 'BoardListItem',
    id: toStringId(board.id),
    title: board.title,
    previewUrl: board.previewUrl,
    updatedAt: board.updatedAt,
    membersCount: orm.boardMembers.findMany({ boardId: board.id }).length,
    myRole,
    myMemberId: toStringId(membership.id),
    canEdit: hasAtLeast(myRole, MemberRole.Admin),
    canDelete: myRole === MemberRole.Owner,
    canManagePermissions: hasAtLeast(myRole, MemberRole.Admin)
  };
}

export { mapBoardCard, mapBoardColumn, mapBoardListItem, mapBoardMember, mapInvite };
