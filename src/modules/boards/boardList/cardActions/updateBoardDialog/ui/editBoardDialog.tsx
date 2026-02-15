import { ControlledDialog } from '@/common/ui/controlled-dialog';

import type { BoardDialogProps } from '../../model/boardDialogsConfig';

import { EditBoardForm } from './editBoardForm';

function EditBoardDialog({ card, onOpenChange }: BoardDialogProps) {
  return (
    <ControlledDialog title='Edit board' onOpenChange={onOpenChange} open={true}>
      <EditBoardForm card={card} />
    </ControlledDialog>
  );
}

export { EditBoardDialog };
