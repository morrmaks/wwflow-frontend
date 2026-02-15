import { CardContainer } from '@/common/api/graphql/__generated__';

import type { BoardStoreState } from '../boardStoreState';

import { createOperation } from './createOperation';

interface CreateCardOptimisticInput {
  clientId: string;
  columnId?: string;
  container: CardContainer;
  index?: number;
  title: string;
}

// const createCardOptimistic =
//   ({ clientId, title, container, columnId, index }: CreateCardOptimisticInput) =>
//   (state: BoardStoreState) => {
//     const cards = {
//       ...state.cards,
//       [clientId]: { id: clientId, title, completed: false }
//     };

//     if (container === 'INBOX') {
//       const inboxCardIds = [...state.inboxCardIds];
//       const insertIndex = index ?? inboxCardIds.length;

//       inboxCardIds.splice(insertIndex, 0, clientId);
//       return { ...state, cards, inboxCardIds };
//     }

//     if (container === 'COLUMN' && columnId) {
//       const columns = state.columns.map((col) =>
//         col.id === columnId
//           ? {
//               ...col,
//               cardIds: [
//                 ...col.cardIds.slice(0, index ?? col.cardIds.length),
//                 clientId,
//                 ...col.cardIds.slice(index ?? col.cardIds.length)
//               ]
//             }
//           : col
//       );

//       return { ...state, cards, columns };
//     }

//     return state;
//   };

const createCardOptimistic = (input: CreateCardOptimisticInput) => (state: BoardStoreState) => {
  const { clientId, title, container, columnId, index } = input;

  const cards = {
    ...state.cards,
    [clientId]: { id: clientId, title, completed: false }
  };

  if (container === CardContainer.Inbox) {
    const inboxCardIds = state.inboxCardIds.slice();
    inboxCardIds.splice(index ?? inboxCardIds.length, 0, clientId);

    return { ...state, cards, inboxCardIds };
  }

  const columns = state.columns.map((col) => {
    if (col.id !== columnId) return col;

    const next = col.cardIds.slice();
    next.splice(index ?? next.length, 0, clientId);

    return { ...col, cardIds: next };
  });

  return { ...state, cards, columns };
};

const createCardRollback = (input: CreateCardOptimisticInput) => (state: BoardStoreState) => {
  const cardId = input.clientId;
  if (!state.cards[cardId]) return state;

  const { [cardId]: _, ...cards } = state.cards;

  let inboxCardIds = state.inboxCardIds;
  if (inboxCardIds.includes(cardId)) inboxCardIds = inboxCardIds.filter((id) => id !== cardId);

  const columns = state.columns.map((col) => {
    if (!col.cardIds.includes(cardId)) return col;
    return { ...col, cardIds: col.cardIds.filter((id) => id !== cardId) };
  });

  return {
    ...state,
    cards,
    inboxCardIds,
    columns
  };
};

const createCardOperation = createOperation(
  'CardCreated',
  createCardOptimistic,
  createCardRollback
);

export { createCardOperation };
