import { useDeleteColumnMutation, useRenameColumnMutation } from '../../../(events)';
import { useBoardOperations } from '../../../_hooks/useBoardOperations';
import { useBoardStore } from '../../../_hooks/useBoardStore';
import {
  getBoardId,
  getCardIdsByColumnId,
  getColumnById,
  getColumns
} from '../../../_model/boardSelectors';
import { useSortableBoardColumn } from './useSortableBoardColumn';
import { nanoid } from 'nanoid';

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

    const clientMutationId = nanoid();
    const deleteColumnCtx = deleteColumnOperation({ clientMutationId, column, index });
    deleteColumn({
      variables: { boardId, clientMutationId, columnId },
      context: deleteColumnCtx
    });
  };

  const handleTitleChange = (title: string) => {
    const clientMutationId = nanoid();
    const renameColumnCtx = renameColumnOperation({
      clientMutationId,
      columnId,
      title,
      prevTitle: column?.title ?? ''
    });
    renameColumn({
      variables: { columnId, boardId, clientMutationId, title },
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
