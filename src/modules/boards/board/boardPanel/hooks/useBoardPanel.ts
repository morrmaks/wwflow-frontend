import { useRenameBoardMutation } from '../../boardEvents';
import { useBoardOperations } from '../../hooks/useBoardOperations';
import { useBoardStore } from '../../hooks/useBoardStore';
import { getBoardBackground, getBoardId, getBoardTitle } from '../../model';

function useBoardPanel() {
  const boardId = useBoardStore(getBoardId);
  const title = useBoardStore(getBoardTitle);
  const background = useBoardStore(getBoardBackground);

  const { renameBoardOperation } = useBoardOperations();
  const [renameBoard] = useRenameBoardMutation();

  const handleTitleChange = (newTitle: string) => {
    const renameBoardCtx = renameBoardOperation({ title: newTitle, prevTitle: title });
    renameBoard({ variables: { boardId, title: newTitle }, context: renameBoardCtx });
  };

  return {
    title,
    background,
    handleTitleChange
  };
}

export { useBoardPanel };
