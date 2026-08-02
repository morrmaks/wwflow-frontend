import type { PanelId } from '../../_model/store/boardStoreState';

import { resizablePanelsTabsConfig } from '../_model/resizablePanelsTabsConfig';
import { useBoardActivePanelPreference } from './useBoardPanelLayoutPreference';

function useMobileResizableLayout() {
  const { activePanel: active, setActivePanel } = useBoardActivePanelPreference('board');
  const panel = resizablePanelsTabsConfig.find((p) => p.id === active);

  const setPanel = (id: PanelId) => setActivePanel(id);

  return {
    panel,
    active,
    setPanel
  };
}

export { useMobileResizableLayout };
