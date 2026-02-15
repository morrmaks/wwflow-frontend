import type { BoardBackground } from '@/common/api/graphql/__generated__';

import { useUpdateInboxBackgroundMutation } from '../../boardEvents';
import { useBoardOperations } from '../../hooks/useBoardOperations';
import { useBoardStore } from '../../hooks/useBoardStore';
import { getBoardId, getInboxBackground } from '../../model/boardSelectors';

function useInboxDropdownMenu() {
  const boardId = useBoardStore(getBoardId);
  const background = useBoardStore(getInboxBackground);

  const { updateInboxBackgroundOperation } = useBoardOperations();
  const [updateInboxBackground] = useUpdateInboxBackgroundMutation();

  const handleSelect = (background: BoardBackground) => {
    updateInboxBackgroundOperation({ background });
    updateInboxBackground({ variables: { boardId, background } });
  };

  return {
    background,
    handleSelect
  };
}

export { useInboxDropdownMenu };
