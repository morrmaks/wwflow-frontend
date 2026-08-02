import { nanoid } from 'nanoid';

import { useRenameBoardMutation } from '../../(events)';
import { useBoardOperations } from '../../_hooks/useBoardOperations';
import { useBoardStore } from '../../_hooks/useBoardStore';
import { getBoardBackground, getBoardId, getBoardTitle } from '../../_model/boardSelectors';

function useBoardPanel() {
  const boardId = useBoardStore(getBoardId);
  const title = useBoardStore(getBoardTitle);
  const background = useBoardStore(getBoardBackground);

  const { renameBoardOperation } = useBoardOperations();
  const [renameBoard] = useRenameBoardMutation();

  const handleTitleChange = (newTitle: string) => {
    const clientMutationId = nanoid();
    const renameBoardCtx = renameBoardOperation({
      clientMutationId,
      title: newTitle,
      prevTitle: title
    });
    renameBoard({
      variables: { boardId, clientMutationId, title: newTitle },
      context: renameBoardCtx
    });
  };

  return {
    title,
    background,
    handleTitleChange
  };
}

export { useBoardPanel };
