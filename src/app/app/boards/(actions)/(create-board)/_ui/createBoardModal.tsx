import { Button } from '@src/common/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogSeparator,
  DialogTitle,
  DialogTrigger
} from '@src/common/ui/dialog';
import { PlusIcon } from 'lucide-react';

import { CreateBoardForm } from './createBoardForm';

function CreateBoardModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          Create board
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create board</DialogTitle>
        </DialogHeader>
        <DialogSeparator />
        <CreateBoardForm />
      </DialogContent>
    </Dialog>
  );
}

export { CreateBoardModal };
