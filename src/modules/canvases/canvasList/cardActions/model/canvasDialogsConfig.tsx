import type { ComponentType } from 'react';

import type { CanvasCardFragment } from '@/common/api/graphql/__generated__';

import { DeleteCanvasDialog } from '../deleteCanvasDialog';
import { EditCanvasDialog } from '../updateCanvasDialog';
import { ManageCanvasInvitesDialog } from '../updateCanvasInvitesDialog';

export type CanvasActionKey = 'delete' | 'edit' | 'invite';

export type CanvasActionHandlers = Record<CanvasActionKey, () => void>;

export interface CanvasDialogProps {
  card: CanvasCardFragment;
  onOpenChange: (open: boolean) => void;
}

interface CanvasDialog {
  action: CanvasActionKey;
  dialog: ComponentType<CanvasDialogProps>;
}

export const canvasDialogsConfig: CanvasDialog[] = [
  {
    action: 'edit',
    dialog: EditCanvasDialog
  },
  {
    action: 'invite',
    dialog: ManageCanvasInvitesDialog
  },
  {
    action: 'delete',
    dialog: DeleteCanvasDialog
  }
];
