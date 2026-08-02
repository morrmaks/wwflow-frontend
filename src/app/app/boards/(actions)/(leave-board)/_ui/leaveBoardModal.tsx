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
import { LogOutIcon } from 'lucide-react';

import { useLeaveBoardModal } from '../_hooks/useLeaveBoardModal';

interface DeleteBoardModalProps {
  board: BoardListFieldsFragment;
}

function LeaveBoardModal({ board }: DeleteBoardModalProps) {
  const { handleLeave } = useLeaveBoardModal(board);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='rounded-sm gap-2 p-0 justify-start w-full' size='sm' variant='ghost'>
          <LogOutIcon className='text-muted-foreground' />
          Leave
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leave from board</DialogTitle>
        </DialogHeader>

        <DialogSeparator />

        <DialogDescription>
          Are you sure you want to leave from this board? This action cannot be undone.
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='ghost'>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant='destructive' onClick={handleLeave}>
              Leave
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { LeaveBoardModal };
