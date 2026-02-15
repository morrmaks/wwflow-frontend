import type { BoardStoreState } from '../boardStoreState';

import { createOperation } from './createOperation';

interface MoveColumnInput {
  fromIndex: number;
  toIndex: number;
}

function moveColumnPure(
  state: BoardStoreState,
  fromIndex: number,
  toIndex: number
): BoardStoreState {
  if (fromIndex === toIndex) return state;

  const columns = state.columns.slice();
  const [item] = columns.splice(fromIndex, 1);
  columns.splice(toIndex, 0, item);

  return { ...state, columns };
}

const moveColumnOptimistic = (input: MoveColumnInput) => (state: BoardStoreState) =>
  moveColumnPure(state, input.fromIndex, input.toIndex);

const moveColumnRollback = (input: MoveColumnInput) => (state: BoardStoreState) =>
  moveColumnPure(state, input.toIndex, input.fromIndex);

const moveColumnOperation = createOperation(
  'ColumnMoved',
  moveColumnOptimistic,
  moveColumnRollback
);

export { moveColumnOperation };
