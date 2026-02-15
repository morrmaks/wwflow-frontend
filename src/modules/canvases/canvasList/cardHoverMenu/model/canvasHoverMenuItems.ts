import type { LucideIcon } from 'lucide-react';

import { PencilIcon, TrashIcon, UserIcon } from 'lucide-react';

import type { CanvasActionKey } from '../../cardActions';

interface CanvasHoverMenuItem {
  icon: LucideIcon;
  key: CanvasActionKey;
  label: string;
  variant?: 'destructive';
}

const canvasHoverMenuItems: CanvasHoverMenuItem[] = [
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

export { canvasHoverMenuItems };
