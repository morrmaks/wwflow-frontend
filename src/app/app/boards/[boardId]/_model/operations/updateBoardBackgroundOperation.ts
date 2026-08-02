import type { BoardBackground } from '@src/common/api/graphql/__generated__';

import type { BoardStoreState } from '../store/boardStoreState';

import { createOperation } from './createOperation';

interface UpdateBoardBackgroundInput {
  background: BoardBackground;
  clientMutationId: string;
  prevBackground: BoardBackground;
}

const updateBoardBackgroundOptimistic =
  (input: UpdateBoardBackgroundInput) => (state: BoardStoreState) => ({
    ...state,
    boardBackground: input.background
  });

const updateBoardBackgroundRollback =
  (input: UpdateBoardBackgroundInput) => (state: BoardStoreState) => ({
    ...state,
    boardBackground: input.prevBackground
  });

const updateBoardBackgroundOperation = createOperation(
  'BoardBackgroundChanged',
  updateBoardBackgroundOptimistic,
  updateBoardBackgroundRollback
);

export { updateBoardBackgroundOperation };
