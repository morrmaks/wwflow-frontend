import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';

import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core';

import { useMoveCardMutation, useMoveColumnMutation } from '../../boardEvents';
import { useBoardOperations } from '../../hooks/useBoardOperations';

function useBoardDnd() {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const { moveCardOperation, moveColumnOperation } = useBoardOperations();

  const [moveCard] = useMoveCardMutation();
  const [moveColumn] = useMoveColumnMutation();

  const onDragStart = (_event: DragStartEvent) => document.body.classList.add('cursor-grabbing');

  const onDragEnd = (event: DragEndEvent) => {
    document.body.classList.remove('cursor-grabbing');

    const { active, over } = event;
    if (!over) return;

    const a = active.data.current;
    const o = over.data.current;
    if (!a || !o) return;

    if (a.type === 'column') {
      if (o.type !== 'column' || a.index === o.index) return;

      const moveColumnCtx = moveColumnOperation({
        fromIndex: a.index,
        toIndex: o.index
      });

      moveColumn({
        variables: {
          boardId: a.boardId,
          columnId: a.columnId,
          toIndex: o.index
        },
        context: moveColumnCtx
      });

      return;
    }

    if (a.type === 'card') {
      if (
        !o.container ||
        (a.container === o.container && a.columnId === o.columnId && a.index === o.index)
      )
        return;

      const moveCardCtx = moveCardOperation({
        cardId: a.cardId,
        from: {
          container: a.container,
          columnId: a.columnId,
          index: a.index
        },
        to: {
          container: o.container,
          columnId: o.columnId
        },
        index: o.index
      });

      moveCard({
        variables: {
          boardId: a.boardId,
          cardId: a.cardId,
          to: {
            container: o.container,
            columnId: o.columnId,
            index: o.index
          }
        },
        context: moveCardCtx
      });
    }
  };

  return {
    sensors,
    onDragEnd,
    onDragStart
  };
}

export { useBoardDnd };
