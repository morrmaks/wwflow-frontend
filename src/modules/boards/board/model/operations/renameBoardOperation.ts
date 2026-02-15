import type { BoardStoreState } from '../boardStoreState';

import { createOperation } from './createOperation';

interface RenameBoardInput {
  prevTitle: string;
  title: string;
}

const renameBoardOptimistic = (input: RenameBoardInput) => (state: BoardStoreState) => ({
  ...state,
  title: input.title
});

const renameBoardRollback = (input: RenameBoardInput) => (state: BoardStoreState) => ({
  ...state,
  title: input.prevTitle
});

const renameBoardOperation = createOperation(
  'BoardRenamed',
  renameBoardOptimistic,
  renameBoardRollback
);

export { renameBoardOperation };
