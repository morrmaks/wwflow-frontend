import { CardContainer } from '@/common/api/graphql/__generated__';

import type { BoardStoreState } from '../boardStoreState';

import { createOperation } from './createOperation';

interface MoveCardOptimisticInput {
  cardId: string;
  index: number;
  from: {
    container: CardContainer;
    columnId: string;
    index: number;
  };
  to: {
    container: CardContainer;
    columnId: string;
  };
}

function moveCardPure(
  state: BoardStoreState,
  cardId: string,
  container: CardContainer,
  columnId: string | null,
  index: number
): BoardStoreState {
  let inboxCardIds = state.inboxCardIds;
  let columns = state.columns;

  if (inboxCardIds.includes(cardId)) inboxCardIds = inboxCardIds.filter((id) => id !== cardId);

  columns = columns.map((col) => {
    let cardIds = col.cardIds;
    let changed = false;

    if (cardIds.includes(cardId)) {
      cardIds = cardIds.filter((id) => id !== cardId);
      changed = true;
    }

    if (container === CardContainer.Column && columnId && col.id === columnId) {
      const next = cardIds.slice();
      next.splice(index, 0, cardId);
      cardIds = next;
      changed = true;
    }

    return changed ? { ...col, cardIds } : col;
  });

  if (container === CardContainer.Inbox) {
    const next = inboxCardIds.slice();
    next.splice(index, 0, cardId);
    inboxCardIds = next;
  }

  return {
    ...state,
    inboxCardIds,
    columns
  };
}

const moveCardOptimistic =
  ({ cardId, to, index }: MoveCardOptimisticInput) =>
  (state: BoardStoreState) =>
    moveCardPure(state, cardId, to.container, to.columnId ?? null, index);

const moveCardRollback =
  ({ cardId, from }: MoveCardOptimisticInput) =>
  (state: BoardStoreState) =>
    moveCardPure(state, cardId, from.container, from.columnId ?? null, from.index);

const moveCardOperation = createOperation('CardMoved', moveCardOptimistic, moveCardRollback);

export { moveCardOperation };
