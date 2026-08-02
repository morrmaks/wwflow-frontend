import type { AppOrm, ModelOf } from '@mock/infra/orm';
import type { ServiceResult } from '@mock/shared';
import type {
  BoardListItem,
  DeleteBoardPayload,
  UpdateBoardInput,
  UpdateBoardPayload
} from '@src/common/api/graphql/__generated__';

import { failure, success, toNumberId, toStringId } from '@mock/shared';
import { BoardBackground, MemberRole } from '@src/common/api/graphql/__generated__';

import { mapBoardListItem } from './board.mapper';
import { getMember, hasAtLeast } from '../domain/board.permissions-utils';
import { createDefaultBoardStructure } from '../infrastructure/board.seed';

class BoardCommand {
  private static deleteCascade(orm: AppOrm, boardId: number) {
    const columns = orm.columns.findMany({ boardId });
    const columnIds = columns.map((c) => c.id);
    const columnIdSet = new Set(columnIds);

    const cards = orm.cards.findMany().filter((card) => columnIdSet.has(card.columnId));
    const cardIds = cards.map((c) => c.id);

    const members = orm.boardMembers.findMany({ boardId });
    const memberIds = members.map((m) => m.id);

    const invites = orm.invites.findMany({ boardId });
    const inviteIds = invites.map((i) => i.id);

    if (cardIds.length) orm.cards.deleteMany(cardIds);
    if (columnIds.length) orm.columns.deleteMany(columnIds);
    if (memberIds.length) orm.boardMembers.deleteMany(memberIds);
    if (inviteIds.length) orm.invites.deleteMany(inviteIds);

    orm.boards.delete(boardId);
  }

  // ======================================
  // Create
  // ======================================

  static createBoard(
    title: string,
    previewUrl: string | null,
    userId: string,
    orm: AppOrm
  ): ServiceResult<BoardListItem> {
    const uId = toNumberId(userId);
    const now = new Date().toISOString();

    const board = orm.boards.create({
      title,
      previewUrl,
      archivedAt: null,
      createdAt: now,
      updatedAt: now,

      panelInboxSize: 0.3,
      panelBoardSize: 0.7,

      inboxBackground: BoardBackground.Grey,
      boardBackground: BoardBackground.Grey,

      revision: 1
    });

    const membership = orm.boardMembers.create({
      role: MemberRole.Owner,
      userId: uId,
      boardId: board.id
    });

    createDefaultBoardStructure(orm, board.id, now);

    return success(mapBoardListItem(orm, board, membership));
  }

  // ======================================
  // Update
  // ======================================

  static updateBoard(
    boardId: string,
    input: UpdateBoardInput,
    userId: string,
    orm: AppOrm,
    previewUrl?: string | null
  ): ServiceResult<UpdateBoardPayload> {
    const bId = toNumberId(boardId);
    const uId = toNumberId(userId);

    const board = orm.boards.findById(bId);
    if (!board) return failure('Board not found', 'BOARD_NOT_FOUND');

    const member = getMember(orm, bId, uId);
    if (!member) return failure('Access denied', 'ACCESS_DENIED');

    if (!hasAtLeast(member.role, MemberRole.Admin))
      return failure('INSUFFICIENT_PERMISSIONS', 'INSUFFICIENT_PERMISSIONS');

    const updateData: Partial<ModelOf<'boards'>> = {
      updatedAt: new Date().toISOString()
    };

    if (typeof input.title === 'string') {
      updateData.title = input.title;
    }

    if (input.removePreview) {
      updateData.previewUrl = null;
    } else if (previewUrl) {
      updateData.previewUrl = previewUrl;
    }

    orm.boards.update(bId, updateData);

    const updated = orm.boards.findById(bId)!;

    return success({
      __typename: 'UpdateBoardPayload',
      id: toStringId(updated.id),
      title: updated.title,
      previewUrl: updated.previewUrl
    });
  }

  // ======================================
  // Delete
  // ======================================

  static deleteBoard(
    boardId: string,
    userId: string,
    orm: AppOrm
  ): ServiceResult<DeleteBoardPayload> {
    const bId = toNumberId(boardId);
    const uId = toNumberId(userId);

    const board = orm.boards.findById(bId);
    if (!board) return failure('Board not found', 'BOARD_NOT_FOUND');

    const member = getMember(orm, bId, uId);
    if (!member || member.role !== MemberRole.Owner)
      return failure('INSUFFICIENT_PERMISSIONS', 'INSUFFICIENT_PERMISSIONS');

    this.deleteCascade(orm, bId);

    return success({
      __typename: 'DeleteBoardPayload',
      id: toStringId(bId)
    });
  }
}

export { BoardCommand };
