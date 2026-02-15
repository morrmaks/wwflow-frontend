import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogSeparator,
  DialogTitle
} from '@/common/ui/dialog';

import { Button } from './button';

interface ControlledDialogProps {
  children: React.ReactNode;
  open: boolean;
  showCloseButton?: boolean;
  title: string;
  onOpenChange: (open: boolean) => void;
}

function ControlledDialog({
  title,
  children,
  open,
  onOpenChange,
  showCloseButton = true
}: ControlledDialogProps) {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent showCloseButton={showCloseButton}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogSeparator />
        {children}
      </DialogContent>
    </Dialog>
  );
}

interface ControlledConfirmDialogProps {
  cancelLabel?: string;
  confirmLabel?: string;
  description: React.ReactNode;
  open: boolean;
  title: string;
  onConfirm: () => void;
  onOpenChange: (open: boolean) => void;
}

function ControlledConfirmDialog({
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  open,
  onOpenChange,
  onConfirm
}: ControlledConfirmDialogProps) {
  return (
    <ControlledDialog title={title} onOpenChange={onOpenChange} open={open} showCloseButton={false}>
      <DialogDescription>{description}</DialogDescription>

      <DialogFooter>
        <Button variant='ghost' onClick={() => onOpenChange(false)}>
          {cancelLabel}
        </Button>

        <Button variant='destructive' onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </DialogFooter>
    </ControlledDialog>
  );
}

export { ControlledConfirmDialog, ControlledDialog };
