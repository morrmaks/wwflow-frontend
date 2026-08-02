import { CardContainer } from '@src/common/api/graphql/__generated__';

import type { BoardStoreState } from '../store/boardStoreState';

import {
  computeCardPosition,
  insertCardIntoContainer,
  removeCardFromAllContainers
} from '../boardStructure';
import { createOperation } from './createOperation';

interface CreateCardOptimisticInput {
  clientMutationId: string;
  clientId: string;
  columnId?: string | null;
  container: CardContainer;
  index?: number;
  title: string;
}

const createCardOptimistic =
  ({ clientId, title, container, columnId, index }: CreateCardOptimisticInput) =>
  (state: BoardStoreState) => {
    const targetIds =
      container === CardContainer.Inbox
        ? state.inboxCardIds
        : (state.columns.find((c) => c.id === columnId)?.cardIds ?? []);

    const position = computeCardPosition(targetIds, state.cards, index ?? targetIds.length);

    const cards = {
      ...state.cards,
      [clientId]: {
        id: clientId,
        title,
        completed: false,
        position
      }
    };

    const { inboxCardIds, columns } = insertCardIntoContainer(
      state,
      clientId,
      container,
      columnId ?? null,
      cards
    );

    return {
      ...state,
      cards,
      inboxCardIds,
      columns
    };
  };

const createCardRollback =
  ({ clientId }: CreateCardOptimisticInput) =>
  (state: BoardStoreState) => {
    if (!state.cards[clientId]) return state;

    const { [clientId]: _, ...cards } = state.cards;

    const { inboxCardIds, columns } = removeCardFromAllContainers(state, clientId);

    return {
      ...state,
      cards,
      inboxCardIds,
      columns
    };
  };

// const createCardOptimistic = (input: CreateCardOptimisticInput) => (state: BoardStoreState) => {
//   const { clientId, title, container, columnId, index } = input;

//   const cards = {
//     ...state.cards,
//     [clientId]: { id: clientId, title, completed: false }
//   };

//   if (container === CardContainer.Inbox) {
//     const inboxCardIds = state.inboxCardIds.slice();
//     inboxCardIds.splice(index ?? inboxCardIds.length, 0, clientId);

//     return { ...state, cards, inboxCardIds };
//   }

//   const columns = state.columns.map((col) => {
//     if (col.id !== columnId) return col;

//     const next = col.cardIds.slice();
//     next.splice(index ?? next.length, 0, clientId);

//     return { ...col, cardIds: next };
//   });

//   return { ...state, cards, columns };
// };

// const createCardRollback = (input: CreateCardOptimisticInput) => (state: BoardStoreState) => {
//   const cardId = input.clientId;
//   if (!state.cards[cardId]) return state;

//   const { [cardId]: _, ...cards } = state.cards;

//   let inboxCardIds = state.inboxCardIds;
//   if (inboxCardIds.includes(cardId)) inboxCardIds = inboxCardIds.filter((id) => id !== cardId);

//   const columns = state.columns.map((col) => {
//     if (!col.cardIds.includes(cardId)) return col;
//     return { ...col, cardIds: col.cardIds.filter((id) => id !== cardId) };
//   });

//   return {
//     ...state,
//     cards,
//     inboxCardIds,
//     columns
//   };
// };

const createCardOperation = createOperation(
  'CardCreated',
  createCardOptimistic,
  createCardRollback
);

export { createCardOperation };
