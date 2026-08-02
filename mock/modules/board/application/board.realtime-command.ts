import type { AppOrm, ModelOf } from '@mock/infra/orm';
import type { ServiceResult } from '@mock/shared';
import type {
  BoardBackground,
  CardPatchInput,
  MoveTargetInput
} from '@src/common/api/graphql/__generated__';

import { failure, success, toNumberId, toStringId } from '@mock/shared';
import { CardContainer, MemberRole } from '@src/common/api/graphql/__generated__';

import type { BoardEvent, BoardEventEnvelope } from '../domain/board.events';

import { publishBoardEvent } from '../domain/board.events';
import { getMember, hasAtLeast } from '../domain/board.permissions-utils';

type BoardEventInput = BoardEvent extends infer Event
  ? Event extends { revision: number }
    ? Omit<Event, 'revision'>
    : never
  : never;

const POSITION_STEP = 1000;
const processedEvents = new Map<string, BoardEventEnvelope>();

function getMutationKey(boardId: string, clientMutationId: string) {
  return `${boardId}:${clientMutationId}`;
}

function replayProcessedEvent(boardId: string, clientMutationId: string) {
  const processed = processedEvents.get(getMutationKey(boardId, clientMutationId));
  if (!processed) return false;

  publishBoardEvent(boardId, processed);
  return true;
}

function getWritableBoard(boardId: string, userId: string, orm: AppOrm) {
  const bId = toNumberId(boardId);
  const uId = toNumberId(userId);
  const board = orm.boards.findById(bId);

  if (!board) return failure('Board not found', 'BOARD_NOT_FOUND');

  const member = getMember(orm, bId, uId);
  if (!member) return failure('Access denied', 'ACCESS_DENIED');

  if (!hasAtLeast(member.role, MemberRole.Member)) {
    return failure('INSUFFICIENT_PERMISSIONS', 'INSUFFICIENT_PERMISSIONS');
  }

  return success(board);
}

function commitBoardEvent(
  orm: AppOrm,
  board: ModelOf<'boards'>,
  clientMutationId: string,
  actorId: string,
  event: BoardEventInput
) {
  const boardId = toStringId(board.id);
  const mutationKey = getMutationKey(boardId, clientMutationId);
  const processed = processedEvents.get(mutationKey);

  if (processed) {
    publishBoardEvent(boardId, processed);
    return processed;
  }

  const revision = board.revision + 1;
  const createdAt = new Date().toISOString();

  orm.boards.update(board.id, {
    revision,
    updatedAt: createdAt
  });

  const versionedEvent = { ...event, revision } as BoardEvent;
  const envelope: BoardEventEnvelope = {
    __typename: 'BoardEventEnvelope',
    boardId,
    revision,
    clientMutationId,
    actorId,
    createdAt,
    event: versionedEvent
  };

  processedEvents.set(mutationKey, envelope);
  publishBoardEvent(boardId, envelope);

  return envelope;
}

function getPositionAtIndex<T extends { position: number }>(items: T[], index: number) {
  if (items.length === 0) return 0;

  const safeIndex = Math.max(0, Math.min(index, items.length));
  const previous = items[safeIndex - 1];
  const next = items[safeIndex];

  if (!previous && next) return next.position - POSITION_STEP;
  if (previous && !next) return previous.position + POSITION_STEP;
  if (previous && next) return (previous.position + next.position) / 2;

  return 0;
}

function getBoardColumns(orm: AppOrm, boardId: number) {
  return orm.columns.findMany({ boardId, isInbox: false }).sort((a, b) => a.position - b.position);
}

function getInboxColumn(orm: AppOrm, boardId: number) {
  return orm.columns.findMany({ boardId, isInbox: true })[0] ?? null;
}

function ensureInboxColumn(orm: AppOrm, board: ModelOf<'boards'>) {
  const existing = getInboxColumn(orm, board.id);
  if (existing) return existing;

  const now = new Date().toISOString();

  return orm.columns.create({
    boardId: board.id,
    clientId: null,
    clientIdExpiresAt: null,
    title: 'Inbox',
    position: -POSITION_STEP,
    isInbox: true,
    createdAt: now,
    updatedAt: now
  });
}

function getCardsInColumn(orm: AppOrm, columnId: number, exceptCardId?: number) {
  return orm.cards
    .findMany({ columnId })
    .filter((card) => card.id !== exceptCardId)
    .sort((a, b) => a.position - b.position);
}

class BoardRealtimeCommand {
  static renameBoard(
    boardId: string,
    clientMutationId: string,
    title: string,
    userId: string,
    orm: AppOrm
  ): ServiceResult<boolean> {
    const result = getWritableBoard(boardId, userId, orm);
    if (!result.success) return result;
    if (replayProcessedEvent(boardId, clientMutationId)) return success(true);

    orm.boards.update(result.data.id, { title });
    commitBoardEvent(orm, result.data, clientMutationId, userId, {
      __typename: 'BoardRenamed',
      title
    });

    return success(true);
  }

  static updateBoardBackground(
    boardId: string,
    clientMutationId: string,
    background: BoardBackground,
    userId: string,
    orm: AppOrm
  ): ServiceResult<boolean> {
    const result = getWritableBoard(boardId, userId, orm);
    if (!result.success) return result;
    if (replayProcessedEvent(boardId, clientMutationId)) return success(true);

    orm.boards.update(result.data.id, { boardBackground: background });
    commitBoardEvent(orm, result.data, clientMutationId, userId, {
      __typename: 'BoardBackgroundChanged',
      background
    });

    return success(true);
  }

  static updateInboxBackground(
    boardId: string,
    clientMutationId: string,
    background: BoardBackground,
    userId: string,
    orm: AppOrm
  ): ServiceResult<boolean> {
    const result = getWritableBoard(boardId, userId, orm);
    if (!result.success) return result;
    if (replayProcessedEvent(boardId, clientMutationId)) return success(true);

    orm.boards.update(result.data.id, { inboxBackground: background });
    commitBoardEvent(orm, result.data, clientMutationId, userId, {
      __typename: 'InboxBackgroundChanged',
      background
    });

    return success(true);
  }

  static createColumn(
    boardId: string,
    clientMutationId: string,
    clientId: string,
    title: string,
    index: number,
    userId: string,
    orm: AppOrm
  ): ServiceResult<boolean> {
    const result = getWritableBoard(boardId, userId, orm);
    if (!result.success) return result;
    if (replayProcessedEvent(boardId, clientMutationId)) return success(true);

    const columns = getBoardColumns(orm, result.data.id);
    const position = getPositionAtIndex(columns, index);
    const now = new Date().toISOString();
    const column = orm.columns.create({
      boardId: result.data.id,
      title,
      position,
      isInbox: false,
      clientId: null,
      clientIdExpiresAt: null,
      createdAt: now,
      updatedAt: now
    });

    commitBoardEvent(orm, result.data, clientMutationId, userId, {
      __typename: 'ColumnCreated',
      clientId,
      index,
      column: {
        __typename: 'ColumnSnapshot',
        id: toStringId(column.id),
        title: column.title,
        position: column.position
      }
    });

    return success(true);
  }

  static moveColumn(
    boardId: string,
    clientMutationId: string,
    columnId: string,
    toIndex: number,
    userId: string,
    orm: AppOrm
  ): ServiceResult<boolean> {
    const result = getWritableBoard(boardId, userId, orm);
    if (!result.success) return result;
    if (replayProcessedEvent(boardId, clientMutationId)) return success(true);

    const cId = toNumberId(columnId);
    const column = orm.columns.findById(cId);
    if (!column || column.boardId !== result.data.id || column.isInbox) {
      return failure('Column not found', 'COLUMN_NOT_FOUND');
    }

    const columns = getBoardColumns(orm, result.data.id).filter((col) => col.id !== cId);
    const position = getPositionAtIndex(columns, toIndex);
    orm.columns.update(cId, { position, updatedAt: new Date().toISOString() });

    commitBoardEvent(orm, result.data, clientMutationId, userId, {
      __typename: 'ColumnMoved',
      columnId,
      position
    });

    return success(true);
  }

  static renameColumn(
    boardId: string,
    clientMutationId: string,
    columnId: string,
    title: string,
    userId: string,
    orm: AppOrm
  ): ServiceResult<boolean> {
    const result = getWritableBoard(boardId, userId, orm);
    if (!result.success) return result;
    if (replayProcessedEvent(boardId, clientMutationId)) return success(true);

    const cId = toNumberId(columnId);
    const column = orm.columns.findById(cId);
    if (!column || column.boardId !== result.data.id)
      return failure('Column not found', 'COLUMN_NOT_FOUND');

    orm.columns.update(cId, { title, updatedAt: new Date().toISOString() });
    commitBoardEvent(orm, result.data, clientMutationId, userId, {
      __typename: 'ColumnRenamed',
      columnId,
      title
    });

    return success(true);
  }

  static deleteColumn(
    boardId: string,
    clientMutationId: string,
    columnId: string,
    userId: string,
    orm: AppOrm
  ): ServiceResult<boolean> {
    const result = getWritableBoard(boardId, userId, orm);
    if (!result.success) return result;
    if (replayProcessedEvent(boardId, clientMutationId)) return success(true);

    const cId = toNumberId(columnId);
    const column = orm.columns.findById(cId);
    if (!column || column.boardId !== result.data.id || column.isInbox) {
      return failure('Column not found', 'COLUMN_NOT_FOUND');
    }

    const cardIds = orm.cards.findMany({ columnId: cId }).map((card) => card.id);
    if (cardIds.length) orm.cards.deleteMany(cardIds);
    orm.columns.delete(cId);
    commitBoardEvent(orm, result.data, clientMutationId, userId, {
      __typename: 'ColumnDeleted',
      columnId
    });

    return success(true);
  }

  static createCard(
    boardId: string,
    clientMutationId: string,
    clientId: string,
    title: string,
    container: CardContainer,
    columnId: string | null | undefined,
    index: number,
    userId: string,
    orm: AppOrm
  ): ServiceResult<boolean> {
    const result = getWritableBoard(boardId, userId, orm);
    if (!result.success) return result;
    if (replayProcessedEvent(boardId, clientMutationId)) return success(true);

    const targetColumn =
      container === CardContainer.Inbox
        ? ensureInboxColumn(orm, result.data)
        : columnId
          ? orm.columns.findById(toNumberId(columnId))
          : null;

    if (!targetColumn || targetColumn.boardId !== result.data.id) {
      return failure('Column not found', 'COLUMN_NOT_FOUND');
    }

    const cards = getCardsInColumn(orm, targetColumn.id);
    const position = getPositionAtIndex(cards, index);
    const now = new Date().toISOString();
    const card = orm.cards.create({
      columnId: targetColumn.id,
      title,
      completed: false,
      position,
      clientId: null,
      clientIdExpiresAt: null,
      createdAt: now,
      updatedAt: now
    });

    commitBoardEvent(orm, result.data, clientMutationId, userId, {
      __typename: 'CardCreated',
      clientId,
      index,
      container,
      columnId: container === CardContainer.Column ? columnId : null,
      card: {
        __typename: 'CardSnapshot',
        id: toStringId(card.id),
        title: card.title,
        completed: card.completed,
        position: card.position
      }
    });

    return success(true);
  }

  static moveCard(
    boardId: string,
    clientMutationId: string,
    cardId: string,
    to: MoveTargetInput,
    userId: string,
    orm: AppOrm
  ): ServiceResult<boolean> {
    const result = getWritableBoard(boardId, userId, orm);
    if (!result.success) return result;
    if (replayProcessedEvent(boardId, clientMutationId)) return success(true);

    const card = orm.cards.findById(toNumberId(cardId));
    if (!card) return failure('Card not found', 'CARD_NOT_FOUND');

    const targetColumn =
      to.container === CardContainer.Inbox
        ? ensureInboxColumn(orm, result.data)
        : to.columnId
          ? orm.columns.findById(toNumberId(to.columnId))
          : null;

    if (!targetColumn || targetColumn.boardId !== result.data.id) {
      return failure('Column not found', 'COLUMN_NOT_FOUND');
    }

    const cards = getCardsInColumn(orm, targetColumn.id, card.id);
    const position = getPositionAtIndex(cards, to.index);

    orm.cards.update(card.id, {
      columnId: targetColumn.id,
      position,
      updatedAt: new Date().toISOString()
    });

    commitBoardEvent(orm, result.data, clientMutationId, userId, {
      __typename: 'CardMoved',
      cardId,
      to: {
        __typename: 'CardMoveTarget',
        container: to.container,
        columnId: to.container === CardContainer.Column ? to.columnId : null,
        position
      }
    });

    return success(true);
  }

  static updateCard(
    boardId: string,
    clientMutationId: string,
    cardId: string,
    patch: CardPatchInput,
    userId: string,
    orm: AppOrm
  ): ServiceResult<boolean> {
    const result = getWritableBoard(boardId, userId, orm);
    if (!result.success) return result;
    if (replayProcessedEvent(boardId, clientMutationId)) return success(true);

    const card = orm.cards.findById(toNumberId(cardId));
    if (!card) return failure('Card not found', 'CARD_NOT_FOUND');

    const column = orm.columns.findById(card.columnId);
    if (!column || column.boardId !== result.data.id)
      return failure('Card not found', 'CARD_NOT_FOUND');

    orm.cards.update(card.id, {
      ...(typeof patch.title === 'string' ? { title: patch.title } : {}),
      ...(typeof patch.completed === 'boolean' ? { completed: patch.completed } : {}),
      updatedAt: new Date().toISOString()
    });

    commitBoardEvent(orm, result.data, clientMutationId, userId, {
      __typename: 'CardUpdated',
      cardId,
      patch: {
        __typename: 'CardPatchPayload',
        title: patch.title ?? null,
        completed: patch.completed ?? null
      }
    });

    return success(true);
  }

  static deleteCard(
    boardId: string,
    clientMutationId: string,
    cardId: string,
    userId: string,
    orm: AppOrm
  ): ServiceResult<boolean> {
    const result = getWritableBoard(boardId, userId, orm);
    if (!result.success) return result;
    if (replayProcessedEvent(boardId, clientMutationId)) return success(true);

    const card = orm.cards.findById(toNumberId(cardId));
    if (!card) return failure('Card not found', 'CARD_NOT_FOUND');

    const column = orm.columns.findById(card.columnId);
    if (!column || column.boardId !== result.data.id)
      return failure('Card not found', 'CARD_NOT_FOUND');

    orm.cards.delete(card.id);
    commitBoardEvent(orm, result.data, clientMutationId, userId, {
      __typename: 'CardDeleted',
      cardId
    });

    return success(true);
  }
}

export { BoardRealtimeCommand };
