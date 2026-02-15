import type { LucideIcon } from 'lucide-react';

import { PencilIcon, TrashIcon, UserIcon } from 'lucide-react';

import type { BoardActionKey } from '../../cardActions';

interface BoardHoverMenuItem {
  icon: LucideIcon;
  key: BoardActionKey;
  label: string;
  variant?: 'destructive';
}

const boardHoverMenuItems: BoardHoverMenuItem[] = [
  {
    key: 'edit',
    label: 'Edit',
    icon: PencilIcon
  },
  {
    key: 'invite',
    label: 'Invite',
    icon: UserIcon
  },
  {
    key: 'delete',
    label: 'Delete',
    variant: 'destructive',
    icon: TrashIcon
  }
];

export { boardHoverMenuItems };
