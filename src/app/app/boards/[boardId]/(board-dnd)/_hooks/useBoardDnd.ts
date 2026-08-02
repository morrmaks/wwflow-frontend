import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';

import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { CardContainer } from '@src/common/api/graphql/__generated__';
import { nanoid } from 'nanoid';

import { useMoveCardMutation, useMoveColumnMutation } from '../../(events)';
import { useBoardOperations } from '../../_hooks/useBoardOperations';
import { useBoardStoreApi } from '../../_hooks/useBoardStoreApi';

function useBoardDnd() {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));
  const store = useBoardStoreApi();

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

      const clientMutationId = nanoid();
      const moveColumnCtx = moveColumnOperation({
        clientMutationId,
        fromIndex: a.index,
        toIndex: o.index
      });

      moveColumn({
        variables: {
          boardId: a.boardId,
          clientMutationId,
          columnId: a.columnId,
          toIndex: o.index
        },
        context: moveColumnCtx
      });

      return;
    }

    if (a.type === 'card') {
      const targetIndex =
        typeof o.index === 'number'
          ? o.index
          : o.container === a.container && o.columnId === a.columnId
            ? o.container === CardContainer.Inbox
              ? store.getState().inboxCardIds.length - 1
              : (store.getState().columns.find((column) => column.id === o.columnId)?.cardIds
                  .length ?? 1) - 1
            : o.container === CardContainer.Inbox
              ? store.getState().inboxCardIds.length
              : (store.getState().columns.find((column) => column.id === o.columnId)?.cardIds
                  .length ?? 0);

      if (
        !o.container ||
        (a.container === o.container && a.columnId === o.columnId && a.index === targetIndex)
      )
        return;

      const clientMutationId = nanoid();
      const targetColumnId = o.container === CardContainer.Column ? o.columnId : null;
      const moveCardCtx = moveCardOperation({
        clientMutationId,
        cardId: a.cardId,
        from: {
          container: a.container,
          columnId: a.columnId,
          index: a.index
        },
        to: {
          container: o.container,
          columnId: targetColumnId
        },
        index: targetIndex
      });

      moveCard({
        variables: {
          boardId: a.boardId,
          clientMutationId,
          cardId: a.cardId,
          to: {
            container: o.container,
            columnId: targetColumnId,
            index: targetIndex
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
