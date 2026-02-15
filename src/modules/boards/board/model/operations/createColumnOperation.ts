import type { BoardStoreState } from '../boardStoreState';

import { createOperation } from './createOperation';

interface CreateColumnOptimisticInput {
  clientId: string;
  index: number;
  title: string;
}
const createColumnOptimistic =
  ({ clientId, title, index }: CreateColumnOptimisticInput) =>
  (state: BoardStoreState) => {
    return {
      ...state,
      columns: [
        ...state.columns.slice(0, index),
        {
          id: clientId,
          title,
          cardIds: []
        },
        ...state.columns.slice(index)
      ]
    };
  };

const createColumnRollback =
  ({ clientId }: CreateColumnOptimisticInput) =>
  (state: BoardStoreState) => {
    const index = state.columns.findIndex((col) => col.id === clientId);
    if (index === -1) return state;

    const columns = state.columns.slice();
    columns.splice(index, 1);

    return { ...state, columns };
  };

const createColumnOperation = createOperation(
  'ColumnCreated',
  createColumnOptimistic,
  createColumnRollback
);

export { createColumnOperation };
