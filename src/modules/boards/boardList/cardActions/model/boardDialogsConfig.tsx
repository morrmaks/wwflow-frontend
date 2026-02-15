import type { ComponentType } from 'react';

import type { BoardCardFragment } from '@/common/api/graphql/__generated__';

import { DeleteBoardDialog } from '../deleteBoardDialog';
import { EditBoardDialog } from '../updateBoardDialog';
import { ManageBoardInvitesDialog } from '../updateBoardInvitesDialog';

export type BoardActionKey = 'delete' | 'edit' | 'invite';

export type BoardActionHandlers = Record<BoardActionKey, () => void>;

export interface BoardDialogProps {
  card: BoardCardFragment;
  onOpenChange: (open: boolean) => void;
}

interface BoardDialog {
  action: BoardActionKey;
  dialog: ComponentType<BoardDialogProps>;
}

export const boardDialogsConfig: BoardDialog[] = [
  {
    action: 'edit',
    dialog: EditBoardDialog
  },
  {
    action: 'invite',
    dialog: ManageBoardInvitesDialog
  },
  {
    action: 'delete',
    dialog: DeleteBoardDialog
  }
];
