import type { BoardStoreState } from '../store/boardStoreState';

import { computeColumnPosition } from '../boardStructure';
import { createOperation } from './createOperation';

interface MoveColumnInput {
  clientMutationId: string;
  fromIndex: number;
  toIndex: number;
}

function applyColumnMove(
  state: BoardStoreState,
  fromIndex: number,
  toIndex: number
): BoardStoreState {
  if (fromIndex === toIndex) return state;

  const moving = state.columns[fromIndex];

  const newPosition = computeColumnPosition(state.columns, fromIndex, toIndex);

  const columns = state.columns
    .map((col) => (col.id === moving.id ? { ...col, position: newPosition } : col))
    .sort((a, b) => a.position - b.position);

  return { ...state, columns };
}

const moveColumnOptimistic =
  ({ fromIndex, toIndex }: MoveColumnInput) =>
  (state: BoardStoreState) =>
    applyColumnMove(state, fromIndex, toIndex);

const moveColumnRollback =
  ({ fromIndex, toIndex }: MoveColumnInput) =>
  (state: BoardStoreState) =>
    applyColumnMove(state, toIndex, fromIndex);

// function moveColumnPure(
//   state: BoardStoreState,
//   fromIndex: number,
//   toIndex: number
// ): BoardStoreState {
//   if (fromIndex === toIndex) return state;

//   const columns = state.columns.slice();
//   const [item] = columns.splice(fromIndex, 1);
//   columns.splice(toIndex, 0, item);

//   return { ...state, columns };
// }

// const moveColumnOptimistic = (input: MoveColumnInput) => (state: BoardStoreState) =>
//   moveColumnPure(state, input.fromIndex, input.toIndex);

// const moveColumnRollback = (input: MoveColumnInput) => (state: BoardStoreState) =>
//   moveColumnPure(state, input.toIndex, input.fromIndex);

const moveColumnOperation = createOperation(
  'ColumnMoved',
  moveColumnOptimistic,
  moveColumnRollback
);

export { moveColumnOperation };
