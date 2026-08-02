import type { CardContainer } from '@src/common/api/graphql/__generated__';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import type { BoardCardSortableData } from '../../(board-dnd)';

function useSortableBoardCard(
  boardId: string,
  container: CardContainer,
  index: number,
  cardId: string,
  columnId?: string
) {
  const data: BoardCardSortableData = {
    type: 'card',
    boardId,
    cardId,
    container,
    columnId,
    index
  };
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: cardId,
    data
  });

  const style = {
    transform: transform
      ? CSS.Transform.toString({
          x: transform.x,
          y: transform.y,
          scaleX: 1,
          scaleY: 1
        })
      : undefined,
    transition
  };

  return {
    setNodeRef,
    attributes,
    listeners,
    isDragging,
    style
  };
}

export { useSortableBoardCard };
