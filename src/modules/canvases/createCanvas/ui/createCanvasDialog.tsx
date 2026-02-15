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

import { CreateCanvasForm } from './createCanvasForm';

function CreateCanvasDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          Create canvas
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create canvas</DialogTitle>
        </DialogHeader>
        <DialogSeparator />
        <CreateCanvasForm />
      </DialogContent>
    </Dialog>
  );
}

export { CreateCanvasDialog };
