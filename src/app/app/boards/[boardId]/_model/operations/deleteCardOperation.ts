import { CardContainer } from '@src/common/api/graphql/__generated__';

import type { BoardStoreState, Card } from '../store/boardStoreState';

import { createOperation } from './createOperation';

interface DeleteCardInput {
  card: Card;
  cardId: string;
  clientMutationId: string;
  columnId?: string;
  container: CardContainer;
  index: number;
}

const deleteCardOptimistic = (input: DeleteCardInput) => (state: BoardStoreState) => {
  const { cardId } = input;

  const { [cardId]: _, ...cards } = state.cards;

  const inboxCardIds = state.inboxCardIds.includes(cardId)
    ? state.inboxCardIds.filter((id) => id !== cardId)
    : state.inboxCardIds;

  const columns = state.columns.map((col) => {
    if (!col.cardIds.includes(cardId)) return col;
    return { ...col, cardIds: col.cardIds.filter((id) => id !== cardId) };
  });

  return { ...state, cards, inboxCardIds, columns };
};

const deleteCardRollback = (input: DeleteCardInput) => (state: BoardStoreState) => {
  const { cardId, card, container, columnId, index } = input;

  const cards = {
    ...state.cards,
    [cardId]: card
  };

  if (container === CardContainer.Inbox) {
    const inboxCardIds = state.inboxCardIds.slice();
    inboxCardIds.splice(index, 0, cardId);

    return { ...state, cards, inboxCardIds };
  }

  const columns = state.columns.map((col) => {
    if (col.id !== columnId) return col;

    const next = col.cardIds.slice();
    next.splice(index, 0, cardId);

    return { ...col, cardIds: next };
  });

  return { ...state, cards, columns };
};

const deleteCardOperation = createOperation(
  'CardDeleted',
  deleteCardOptimistic,
  deleteCardRollback
);

export { deleteCardOperation };
