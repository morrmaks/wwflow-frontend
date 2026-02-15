import { useDroppable } from '@dnd-kit/core';

import { CardContainer } from '@/common/api/graphql/__generated__';

import { inboxContainerId } from '../../boardDnd';
import { useBoardStore } from '../../hooks/useBoardStore';
import { getInboxBackground, getInboxCardIds } from '../../model/boardSelectors';

function useInboxPanel() {
  const cardIds = useBoardStore(getInboxCardIds);
  const background = useBoardStore(getInboxBackground);

  const { setNodeRef } = useDroppable({
    id: inboxContainerId,
    data: {
      type: 'container',
      container: CardContainer.Inbox,
      columnId: null
    }
  });

  return {
    cardIds,
    background,
    setNodeRef
  };
}

export { useInboxPanel };
