import { ClipboardList, KanbanSquare } from 'lucide-react';

import type { PanelId } from '../../model';

import { BoardPanel } from '../../boardPanel';
import { InboxPanel } from '../../inboxPanel';

interface PanelConfig {
  component: React.ComponentType;
  icon: React.ComponentType;
  id: PanelId;
  label: string;
  minSize: string;
}

const resizablePanelsTabsConfig: PanelConfig[] = [
  {
    id: 'inbox',
    label: 'Inbox',
    icon: ClipboardList,
    component: InboxPanel,
    minSize: '272px'
  },
  {
    id: 'board',
    label: 'Board',
    icon: KanbanSquare,
    component: BoardPanel,
    minSize: '272px'
  }
];

export { resizablePanelsTabsConfig };
