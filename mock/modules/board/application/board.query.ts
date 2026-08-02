import type { AppOrm } from '@mock/infra/orm';
import type { ServiceResult} from '@mock/shared';
import type {Board, BoardListItem, BoardPermissionsItem} from '@src/common/api/graphql/__generated__';

import { failure, success, toNumberId, toStringId } from '@mock/shared';

import {
  mapBoardCard,
  mapBoardColumn,
  mapBoardListItem,
  mapBoardMember,
  mapInvite
} from './board.mapper';
import { canRevokeInvite, getMember, roleRank } from '../domain/board.permissions-utils';

class BoardQuery {
  private static buildBoardView(orm: AppOrm, bId: number) {
    const columns = orm.columns.findMany({ boardId: bId }).sort((a, b) => a.position - b.position);

    const inboxColumn = columns.find((c) => c.isInbox);
    const regularColumns = columns.filter((c) => !c.isInbox);

    const columnIds = columns.map((c) => c.id);
    const columnIdSet = new Set(columnIds);

    const cards = orm.cards.findMany().filter((c) => columnIdSet.has(c.columnId));

    const cardsByColumn = new Map<number, typeof cards>();

    cards.forEach((card) => {
      const list = cardsByColumn.get(card.columnId) ?? [];
      list.push(card);
      cardsByColumn.set(card.columnId, list);
    });

    const inboxCards = inboxColumn
      ? (cardsByColumn.get(inboxColumn.id) ?? [])
          .sort((a, b) => a.position - b.position)
          .map((c) => mapBoardCard(c))
      : [];

    const gqlColumns = regularColumns.map((col) => {
      const columnCards = (cardsByColumn.get(col.id) ?? [])
        .sort((a, b) => a.position - b.position)
        .map((c) => mapBoardCard(c));

      return mapBoardColumn(col, columnCards);
    });

    return { inboxCards, columns: gqlColumns };
  }

  static getBoard(boardId: string, userId: string, orm: AppOrm): ServiceResult<Board> {
    const bId = toNumberId(boardId);
    const uId = toNumberId(userId);

    const board = orm.boards.findById(bId);
    if (!board) return failure('Board not found', 'BOARD_NOT_FOUND');

    const member = getMember(orm, bId, uId);
    if (!member) return failure('Access denied', 'ACCESS_DENIED');

    const { inboxCards, columns } = this.buildBoardView(orm, bId);

    return success({
      __typename: 'Board' as const,
      id: toStringId(board.id),
      title: board.title,
      revision: board.revision,
      inboxBackground: board.inboxBackground,
      boardBackground: board.boardBackground,
      panelLayout: {
        __typename: 'PanelLayout' as const,
        inbox: board.panelInboxSize,
        board: board.panelBoardSize
      },
      inboxCards,
      columns
    });
  }

  static getBoardList(userId: string, orm: AppOrm): ServiceResult<BoardListItem[]> {
    const uId = toNumberId(userId);

    const memberships = orm.boardMembers.findMany({ userId: uId });
    const membershipMap = new Map(memberships.map((m) => [m.boardId, m]));

    const boardes = orm.boards
      .findMany()
      .filter((c) => membershipMap.has(c.id))
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

    const items = boardes.map((board) => {
      const membership = membershipMap.get(board.id)!;
      return mapBoardListItem(orm, board, membership);
    });

    return success(items);
  }

  static getBoardPermissions(
    boardId: string,
    userId: string,
    orm: AppOrm
  ): ServiceResult<BoardPermissionsItem> {
    const bId = toNumberId(boardId);
    const uId = toNumberId(userId);

    const board = orm.boards.findById(bId);
    if (!board) return failure('Board not found', 'BOARD_NOT_FOUND');

    const member = getMember(orm, bId, uId);
    if (!member) return failure('Access denied', 'ACCESS_DENIED');

    const members = orm.boardMembers
      .findMany({ boardId: bId })
      .sort((a, b) => roleRank[b.role] - roleRank[a.role])
      .map((m) => mapBoardMember(orm, m, uId, member.role));

    const invites = orm.invites
      .findMany({ boardId: bId })
      .map((invite) => mapInvite(invite, canRevokeInvite(member, invite, uId)));

    return success({
      __typename: 'BoardPermissionsItem' as const,
      id: toStringId(board.id),
      myRole: member.role,
      members,
      invites
    });
  }
}

export { BoardQuery };
