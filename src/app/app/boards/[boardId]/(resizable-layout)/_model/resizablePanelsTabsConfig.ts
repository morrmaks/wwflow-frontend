import { ClipboardList, KanbanSquare } from 'lucide-react';

import type { PanelId } from '../../_model/store/boardStoreState';

import { InboxPanel } from '../../(inbox)';
import { BoardPanel } from '../../(panel)';

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
