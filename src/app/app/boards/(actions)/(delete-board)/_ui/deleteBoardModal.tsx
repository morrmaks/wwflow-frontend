import type { BoardListFieldsFragment } from '@src/common/api/graphql/__generated__';

import { Button } from '@src/common/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogSeparator,
  DialogTitle,
  DialogTrigger
} from '@src/common/ui/dialog';
import { TrashIcon } from 'lucide-react';

import { useDeleteBoardModal } from '../_hooks/useDeleteBoardModal';

interface DeleteBoardModalProps {
  board: BoardListFieldsFragment;
}

function DeleteBoardModal({ board }: DeleteBoardModalProps) {
  const { handleDelete } = useDeleteBoardModal(board);

  if (!board.canDelete) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className='rounded-sm gap-2 p-0 justify-start w-full'
          size='sm'
          variant='destructive'
        >
          <TrashIcon className='text-muted-foreground' />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete board</DialogTitle>
        </DialogHeader>

        <DialogSeparator />

        <DialogDescription>
          Are you sure you want to delete this board? This action cannot be undone.
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='ghost'>Cancel</Button>
          </DialogClose>
          <Button variant='destructive' onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { DeleteBoardModal };
