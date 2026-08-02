import type { BoardCardSortableData } from '../_model/dragTypes';

import { BoardCard } from '../../(board-card)';

interface BoardCardDragOverlayProps {
  data: BoardCardSortableData;
}

function BoardCardDragOverlay({ data }: BoardCardDragOverlayProps) {
  return (
    <BoardCard
      cardId={data.cardId}
      index={data.index}
      columnId={data.columnId}
      container={data.container}
    />
  );
}

export { BoardCardDragOverlay };
