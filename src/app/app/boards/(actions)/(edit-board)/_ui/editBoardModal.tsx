import type { BoardListFieldsFragment } from '@src/common/api/graphql/__generated__';

import { Button } from '@src/common/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogSeparator,
  DialogTitle,
  DialogTrigger
} from '@src/common/ui/dialog';
import { PencilIcon } from 'lucide-react';

import { EditBoardForm } from './editBoardForm';

interface EditBoardModalProps {
  board: BoardListFieldsFragment;
}

function EditBoardModal({ board }: EditBoardModalProps) {
  if (!board.canEdit) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='rounded-sm gap-2 p-0 justify-start w-full' size='sm' variant='ghost'>
          <PencilIcon className='text-muted-foreground' />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit board</DialogTitle>
        </DialogHeader>
        <DialogSeparator />
        <EditBoardForm board={board}></EditBoardForm>
      </DialogContent>
    </Dialog>
  );
}

export { EditBoardModal };
