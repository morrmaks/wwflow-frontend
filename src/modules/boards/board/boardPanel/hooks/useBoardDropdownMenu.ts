import type { BoardBackground } from '@/common/api/graphql/__generated__';

import { useUpdateBoardBackgroundMutation } from '../../boardEvents';
import { useBoardOperations } from '../../hooks/useBoardOperations';
import { useBoardStore } from '../../hooks/useBoardStore';
import { getBoardBackground, getBoardId } from '../../model';

function useBoardDropdownMenu() {
  const boardId = useBoardStore(getBoardId);
  const background = useBoardStore(getBoardBackground);

  const { updateBoardBackgroundOperation } = useBoardOperations();
  const [updateBoardBackground] = useUpdateBoardBackgroundMutation();

  const handleSelect = (background: BoardBackground) => {
    updateBoardBackgroundOperation({ background });
    updateBoardBackground({ variables: { boardId, background } });
  };

  return {
    background,
    handleSelect
  };
}

export { useBoardDropdownMenu };
