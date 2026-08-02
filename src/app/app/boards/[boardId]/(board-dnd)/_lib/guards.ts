import type { BoardDragData } from '../_model/dragTypes';

function isBoardDragData(data: unknown): data is BoardDragData {
  if (!data || typeof data !== 'object') return false;

  return 'type' in data && (data.type === 'card' || data.type === 'column');
}

export { isBoardDragData };
