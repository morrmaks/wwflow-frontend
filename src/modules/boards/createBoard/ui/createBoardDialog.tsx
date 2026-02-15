import { PlusIcon } from 'lucide-react';

import { Button } from '@/common/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogSeparator,
  DialogTitle,
  DialogTrigger
} from '@/common/ui/dialog';

import { CreateBoardForm } from './createBoardForm';

function CreateBoardDialog() {
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

export { CreateBoardDialog };
