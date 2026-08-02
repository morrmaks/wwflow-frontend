import type { BoardColumnSortableData } from '../_model/dragTypes';

import { BoardColumn } from '../../(panel)/(board-column)';

interface BoardColumnDragOverlayProps {
  data: BoardColumnSortableData;
}

function BoardColumnDragOverlay({ data }: BoardColumnDragOverlayProps) {
  return <BoardColumn index={data.index} columnId={data.columnId} />;
}

export { BoardColumnDragOverlay };
