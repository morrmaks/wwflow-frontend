import type { BoardBackground } from '@src/common/api/graphql/__generated__';

import { nanoid } from 'nanoid';

import { useUpdateInboxBackgroundMutation } from '../../(events)';
import { useBoardOperations } from '../../_hooks/useBoardOperations';
import { useBoardStore } from '../../_hooks/useBoardStore';
import { getBoardId, getInboxBackground } from '../../_model/boardSelectors';

function useInboxDropdownMenu() {
  const boardId = useBoardStore(getBoardId);
  const background = useBoardStore(getInboxBackground);

  const { updateInboxBackgroundOperation } = useBoardOperations();
  const [updateInboxBackground] = useUpdateInboxBackgroundMutation();

  const handleSelect = (nextBackground: BoardBackground) => {
    const clientMutationId = nanoid();
    const updateInboxBackgroundCtx = updateInboxBackgroundOperation({
      clientMutationId,
      background: nextBackground,
      prevBackground: background
    });
    updateInboxBackground({
      variables: { boardId, clientMutationId, background: nextBackground },
      context: updateInboxBackgroundCtx
    });
  };

  return {
    background,
    handleSelect
  };
}

export { useInboxDropdownMenu };
