import type { CanvasListFieldsFragment } from '@src/common/api/graphql/__generated__';

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

import { EditCanvasForm } from './editCanvasForm';

interface EditCanvasModalProps {
  canvas: CanvasListFieldsFragment;
}

function EditCanvasModal({ canvas }: EditCanvasModalProps) {
  if (!canvas.canEdit) return null;

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
          <DialogTitle>Edit canvas</DialogTitle>
        </DialogHeader>
        <DialogSeparator />
        <EditCanvasForm canvas={canvas}></EditCanvasForm>
      </DialogContent>
    </Dialog>
  );
}

export { EditCanvasModal };
