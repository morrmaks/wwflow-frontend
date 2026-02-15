import { useDroppable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { CardContainer } from '@/common/api/graphql/__generated__';

import type { BoardColumnDroppableData, BoardColumnSortableData } from '../../../boardDnd';

import { getColumnContainerId } from '../../../boardDnd';

function useSortableBoardColumn(
  columnId: string,
  index: number,
  boardId: string,
  isDeleting: boolean
) {
  const sortableData: BoardColumnSortableData = {
    type: 'column',
    columnId,
    boardId,
    index
  };

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: columnId,
    disabled: isDeleting,
    data: sortableData
  });

  const droppableData: BoardColumnDroppableData = {
    type: 'container',
    container: CardContainer.Column,
    columnId
  };

  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: getColumnContainerId(columnId),
    disabled: isDeleting,
    data: droppableData
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
    setDropRef,
    isOver,
    attributes,
    listeners,
    isDragging,
    style
  };
}

export { useSortableBoardColumn };
