import { ControlledDialog } from '@/common/ui/controlled-dialog';

import type { CanvasDialogProps } from '../../model/canvasDialogsConfig';

import { EditCanvasForm } from './editCanvasForm';

function EditCanvasDialog({ card, onOpenChange }: CanvasDialogProps) {
  return (
    <ControlledDialog title='Edit canvas' onOpenChange={onOpenChange} open={true}>
      <EditCanvasForm card={card} />
    </ControlledDialog>
  );
}

export { EditCanvasDialog };
