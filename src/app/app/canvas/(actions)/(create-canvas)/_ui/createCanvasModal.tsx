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

import { CreateCanvasForm } from './createCanvasForm';

function CreateCanvasModal() {
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

export { CreateCanvasModal };
