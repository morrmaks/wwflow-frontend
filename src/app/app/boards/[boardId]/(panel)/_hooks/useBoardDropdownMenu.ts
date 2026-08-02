import type { BoardBackground } from '@src/common/api/graphql/__generated__';

import { nanoid } from 'nanoid';

import { useUpdateBoardBackgroundMutation } from '../../(events)';
import { useBoardOperations } from '../../_hooks/useBoardOperations';
import { useBoardStore } from '../../_hooks/useBoardStore';
import { getBoardBackground, getBoardId } from '../../_model/boardSelectors';

function useBoardDropdownMenu() {
  const boardId = useBoardStore(getBoardId);
  const background = useBoardStore(getBoardBackground);

  const { updateBoardBackgroundOperation } = useBoardOperations();
  const [updateBoardBackground] = useUpdateBoardBackgroundMutation();

  const handleSelect = (nextBackground: BoardBackground) => {
    const clientMutationId = nanoid();
    const updateBoardBackgroundCtx = updateBoardBackgroundOperation({
      clientMutationId,
      background: nextBackground,
      prevBackground: background
    });
    updateBoardBackground({
      variables: { boardId, clientMutationId, background: nextBackground },
      context: updateBoardBackgroundCtx
    });
  };

  return {
    background,
    handleSelect
  };
}

export { useBoardDropdownMenu };
