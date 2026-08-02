import type { BoardStoreState } from '../store/boardStoreState';

import { createOperation } from './createOperation';

interface RenameColumnInput {
  columnId: string;
  clientMutationId: string;
  prevTitle: string;
  title: string;
}

const renameColumnOptimistic = (input: RenameColumnInput) => (state: BoardStoreState) => ({
  ...state,
  columns: state.columns.map((col) =>
    col.id === input.columnId ? { ...col, title: input.title } : col
  )
});

const renameColumnRollback = (input: RenameColumnInput) => (state: BoardStoreState) => ({
  ...state,
  columns: state.columns.map((col) =>
    col.id === input.columnId ? { ...col, title: input.prevTitle } : col
  )
});

const renameColumnOperation = createOperation(
  'ColumnRenamed',
  renameColumnOptimistic,
  renameColumnRollback
);

export { renameColumnOperation };
