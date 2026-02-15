import type { BoardStoreState, Column } from '../boardStoreState';

import { createOperation } from './createOperation';

interface DeleteColumnInput {
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
