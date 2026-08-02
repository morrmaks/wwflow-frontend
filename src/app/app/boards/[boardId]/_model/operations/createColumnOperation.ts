import type { BoardStoreState } from '../store/boardStoreState';

import { createOperation } from './createOperation';

interface CreateColumnOptimisticInput {
  clientMutationId: string;
  clientId: string;
  index: number;
  title: string;
}

function computeInsertPosition(columns: BoardStoreState['columns'], index: number) {
  const prev = columns[index - 1];
  const next = columns[index];

  if (!prev && !next) return 1000;
  if (!prev) return next.position / 2;
  if (!next) return prev.position + 1000;

  return (prev.position + next.position) / 2;
}

const createColumnOptimistic =
  ({ clientId, title, index }: CreateColumnOptimisticInput) =>
  (state: BoardStoreState) => {
    const position = computeInsertPosition(state.columns, index);

    const columns = [
      ...state.columns,
      {
        id: clientId,
        title,
        position,
        cardIds: []
      }
    ].sort((a, b) => a.position - b.position);

    return { ...state, columns };
  };

const createColumnRollback =
  ({ clientId }: CreateColumnOptimisticInput) =>
  (state: BoardStoreState) => {
    return {
      ...state,
      columns: state.columns.filter((col) => col.id !== clientId)
    };
  };

// const createColumnOptimistic =
//   ({ clientId, title, index }: CreateColumnOptimisticInput) =>
//   (state: BoardStoreState) => {
//     return {
//       ...state,
//       columns: [
//         ...state.columns.slice(0, index),
//         {
//           id: clientId,
//           title,
//           cardIds: []
//         },
//         ...state.columns.slice(index)
//       ]
//     };
//   };

// const createColumnRollback =
//   ({ clientId }: CreateColumnOptimisticInput) =>
//   (state: BoardStoreState) => {
//     const index = state.columns.findIndex((col) => col.id === clientId);
//     if (index === -1) return state;

//     const columns = state.columns.slice();
//     columns.splice(index, 1);

//     return { ...state, columns };
//   };

const createColumnOperation = createOperation(
  'ColumnCreated',
  createColumnOptimistic,
  createColumnRollback
);

export { createColumnOperation };
