import type { BoardCardSortableData } from '../model/dragTypes';

import { BoardCard } from '../../boardCard/ui/boardCard';

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
