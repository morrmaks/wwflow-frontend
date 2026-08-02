import { CardContainer } from '@src/common/api/graphql/__generated__';

import type { BoardStoreState } from '../store/boardStoreState';

import { computeCardPosition, removeCardFromAllContainers } from '../boardStructure';
import { createOperation } from './createOperation';

interface MoveCardOptimisticInput {
  cardId: string;
  clientMutationId: string;
  index: number;
  from: {
    container: CardContainer;
    columnId?: string | null;
    index: number;
  };
  to: {
    container: CardContainer;
    columnId?: string | null;
  };
}

function applyCardMove(
  state: BoardStoreState,
  cardId: string,
  container: CardContainer,
  columnId: string | null,
  index: number
): BoardStoreState {
  const { inboxCardIds, columns } = removeCardFromAllContainers(state, cardId);

  const targetIds =
    container === CardContainer.Inbox
      ? inboxCardIds
      : (columns.find((c) => c.id === columnId)?.cardIds ?? []);

  const position = computeCardPosition(targetIds, state.cards, index);

  const cards = {
    ...state.cards,
    [cardId]: {
      ...state.cards[cardId],
      position
    }
  };

  let nextInbox = inboxCardIds;
  let nextColumns = columns;

  if (container === CardContainer.Inbox) {
    nextInbox = [...inboxCardIds, cardId].sort((a, b) => cards[a].position - cards[b].position);
  }

  if (container === CardContainer.Column) {
    nextColumns = columns.map((col) =>
      col.id === columnId
        ? {
            ...col,
            cardIds: [...col.cardIds, cardId].sort((a, b) => cards[a].position - cards[b].position)
          }
        : col
    );
  }

  return {
    ...state,
    cards,
    inboxCardIds: nextInbox,
    columns: nextColumns
  };
}

const moveCardOptimistic =
  ({ cardId, to, index }: MoveCardOptimisticInput) =>
  (state: BoardStoreState) =>
    applyCardMove(state, cardId, to.container, to.columnId ?? null, index);

const moveCardRollback =
  ({ cardId, from }: MoveCardOptimisticInput) =>
  (state: BoardStoreState) =>
    applyCardMove(state, cardId, from.container, from.columnId ?? null, from.index);
// function moveCardPure(
//   state: BoardStoreState,
//   cardId: string,
//   container: CardContainer,
//   columnId: string | null,
//   index: number
// ): BoardStoreState {
//   let inboxCardIds = state.inboxCardIds;
//   let columns = state.columns;

//   if (inboxCardIds.includes(cardId)) inboxCardIds = inboxCardIds.filter((id) => id !== cardId);

//   columns = columns.map((col) => {
//     let cardIds = col.cardIds;
//     let changed = false;

//     if (cardIds.includes(cardId)) {
//       cardIds = cardIds.filter((id) => id !== cardId);
//       changed = true;
//     }

//     if (container === CardContainer.Column && columnId && col.id === columnId) {
//       const next = cardIds.slice();
//       next.splice(index, 0, cardId);
//       cardIds = next;
//       changed = true;
//     }

//     return changed ? { ...col, cardIds } : col;
//   });

//   if (container === CardContainer.Inbox) {
//     const next = inboxCardIds.slice();
//     next.splice(index, 0, cardId);
//     inboxCardIds = next;
//   }

//   return {
//     ...state,
//     inboxCardIds,
//     columns
//   };
// }

// const moveCardOptimistic =
//   ({ cardId, to, index }: MoveCardOptimisticInput) =>
//   (state: BoardStoreState) =>
//     moveCardPure(state, cardId, to.container, to.columnId ?? null, index);

// const moveCardRollback =
//   ({ cardId, from }: MoveCardOptimisticInput) =>
//   (state: BoardStoreState) =>
//     moveCardPure(state, cardId, from.container, from.columnId ?? null, from.index);

const moveCardOperation = createOperation('CardMoved', moveCardOptimistic, moveCardRollback);

export { moveCardOperation };
