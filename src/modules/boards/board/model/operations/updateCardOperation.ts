import type { CardPatchInput } from '@/common/api/graphql/__generated__';

import { removeEmpty } from '@/common/lib/utils';

import type { BoardStoreState } from '../boardStoreState';

import { createOperation } from './createOperation';

interface UpdateCardInput {
  cardId: string;
  patch: CardPatchInput;
  prevPatch: CardPatchInput;
}

const updateCardPure = (state: BoardStoreState, cardId: string, patch: CardPatchInput) => {
  if (!state.cards[cardId]) return state;

  return {
    ...state,
    cards: {
      ...state.cards,
      [cardId]: {
        ...state.cards[cardId],
        ...removeEmpty(patch)
      }
    }
  };
};

const updateCardOptimistic = (input: UpdateCardInput) => (state: BoardStoreState) =>
  updateCardPure(state, input.cardId, input.patch);

const updateCardRollback = (input: UpdateCardInput) => (state: BoardStoreState) =>
  updateCardPure(state, input.cardId, input.prevPatch);

const updateCardOperation = createOperation(
  'CardUpdated',
  updateCardOptimistic,
  updateCardRollback
);

export { updateCardOperation };
