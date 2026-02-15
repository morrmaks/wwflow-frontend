import { ControlledConfirmDialog } from '@/common/ui/controlled-dialog';

import type { CanvasDialogProps } from '../../model/canvasDialogsConfig';

import { useDeleteCanvasMutation } from '../hooks/useDeleteCanvasMutation';

function DeleteCanvasDialog({ card, onOpenChange }: CanvasDialogProps) {
  const [deleteCanvas] = useDeleteCanvasMutation();

  const handleClose = () => {
    onOpenChange(false);
  };

  const handleDelete = async () => {
    await deleteCanvas({ variables: { id: card.id } });
    handleClose();
  };

  return (
    <ControlledConfirmDialog
      title='Delete canvas'
      confirmLabel='Delete'
      description='Are you sure you want to delete this canvas? This action cannot be undone.'
      onConfirm={handleDelete}
      onOpenChange={onOpenChange}
      open={true}
    />
  );
}

export { DeleteCanvasDialog };
