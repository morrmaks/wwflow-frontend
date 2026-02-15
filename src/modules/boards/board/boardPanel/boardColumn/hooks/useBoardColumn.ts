import { useDeleteColumnMutation, useRenameColumnMutation } from '../../../boardEvents';
import { useBoardOperations } from '../../../hooks/useBoardOperations';
import { useBoardStore } from '../../../hooks/useBoardStore';
import { getBoardId, getCardIdsByColumnId, getColumnById, getColumns } from '../../../model';
import { useSortableBoardColumn } from './useSortableBoardColumn';

function useBoardColumn(columnId: string, index: number) {
  const boardId = useBoardStore(getBoardId);
  const column = useBoardStore(getColumnById(columnId));
  const cardIds = useBoardStore(getCardIdsByColumnId(columnId));
  const columns = useBoardStore(getColumns);

  const { deleteColumnOperation } = useBoardOperations();
  const [deleteColumn, { loading: isDeleting }] = useDeleteColumnMutation();

  const { renameColumnOperation } = useBoardOperations();
  const [renameColumn] = useRenameColumnMutation();

  const handleDelete = () => {
    if (!column) return;

    const index = columns.findIndex((col) => col.id === columnId);
    if (index === -1) return;

    const deleteColumnCtx = deleteColumnOperation({ column, index });
    deleteColumn({ variables: { boardId, columnId }, context: deleteColumnCtx });
  };

  const handleTitleChange = (title: string) => {
    const renameColumnCtx = renameColumnOperation({
      columnId,
      title,
      prevTitle: column?.title ?? ''
    });
    renameColumn({
      variables: { columnId, boardId, title },
      context: renameColumnCtx
    });
  };

  const sortable = useSortableBoardColumn(columnId, index, boardId, isDeleting);

  return {
    column,
    cardIds,
    handleTitleChange,
    handleDelete,
    isDeleting,
    ...sortable
  };
}

export { useBoardColumn };
