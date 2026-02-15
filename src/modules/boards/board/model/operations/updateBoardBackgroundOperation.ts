import type { BoardBackground } from '@/common/api/graphql/__generated__';

import type { BoardStoreState } from '../boardStoreState';

import { createOperation } from './createOperation';

interface UpdateBoardBackgroundInput {
  background: BoardBackground;
}

const updateBoardBackgroundOptimistic =
  (input: UpdateBoardBackgroundInput) => (state: BoardStoreState) => ({
    ...state,
    boardBackground: input.background
  });

const updateBoardBackgroundOperation = createOperation(
  'BoardBackgroundChanged',
  updateBoardBackgroundOptimistic
);

export { updateBoardBackgroundOperation };
