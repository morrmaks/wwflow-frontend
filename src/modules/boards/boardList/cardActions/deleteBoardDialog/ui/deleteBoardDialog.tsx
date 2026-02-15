import { ControlledConfirmDialog } from '@/common/ui/controlled-dialog';

import type { BoardDialogProps } from '../../model/boardDialogsConfig';

import { useDeleteBoardMutation } from '../hooks/useDeleteBoardMutation';

function DeleteBoardDialog({ card, onOpenChange }: BoardDialogProps) {
  const [deleteBoard] = useDeleteBoardMutation();

  const handleClose = () => {
    onOpenChange(false);
  };

  const handleDelete = async () => {
    await deleteBoard({ variables: { boardId: card.id } });
    handleClose();
  };

  return (
    <ControlledConfirmDialog
      title='Delete board'
      confirmLabel='Delete'
      description='Are you sure you want to delete this board? This action cannot be undone.'
      onConfirm={handleDelete}
      onOpenChange={onOpenChange}
      open={true}
    />
  );
}

export { DeleteBoardDialog };
