import type { BoardColumnSortableData } from '../model/dragTypes';

import { BoardColumn } from '../../boardPanel/boardColumn/ui/boardColumn';

interface BoardColumnDragOverlayProps {
  data: BoardColumnSortableData;
}

function BoardColumnDragOverlay({ data }: BoardColumnDragOverlayProps) {
  return <BoardColumn index={data.index} columnId={data.columnId} />;
}

export { BoardColumnDragOverlay };
