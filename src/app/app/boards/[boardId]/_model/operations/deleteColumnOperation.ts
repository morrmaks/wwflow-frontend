import type { BoardStoreState, Column } from '../store/boardStoreState';

import { createOperation } from './createOperation';

interface DeleteColumnInput {
  clientMutationId: string;
  column: Column;
  index: number;
}

const deleteColumnOptimistic = (input: DeleteColumnInput) => (state: BoardStoreState) => {
  const columns = state.columns.slice();
  columns.splice(input.index, 1);

  return { ...state, columns };
};

const deleteColumnRollback = (input: DeleteColumnInput) => (state: BoardStoreState) => {
  const columns = state.columns.slice();
  columns.splice(input.index, 0, input.column);

  return { ...state, columns };
};

const deleteColumnOperation = createOperation(
  'ColumnDeleted',
  deleteColumnOptimistic,
  deleteColumnRollback
);

export { deleteColumnOperation };
