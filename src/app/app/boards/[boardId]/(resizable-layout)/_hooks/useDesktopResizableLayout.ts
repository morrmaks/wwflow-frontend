import { useRef } from 'react';

import type { PanelId, PanelLayoutModel } from '../../_model/store/boardStoreState';

import { resizablePanelsTabsConfig } from '../_model/resizablePanelsTabsConfig';
import { useBoardPanelLayoutPreference } from './useBoardPanelLayoutPreference';

function useDesktopResizableLayout() {
  const { panelLayout, setPanelLayout } = useBoardPanelLayoutPreference('desktop');

  const isUserResizingRef = useRef(false);
  const nextLayoutRef = useRef<PanelLayoutModel | null>(null);

  const visiblePanels = resizablePanelsTabsConfig.filter(
    (p) => panelLayout[p.id] !== undefined && panelLayout[p.id]! > 0
  );
  const activePanelIds = visiblePanels.map((panel) => panel.id);

  const persistLayout = (nextLayout: PanelLayoutModel) => {
    setPanelLayout(nextLayout);
  };

  const handleLayoutChange = (layout: PanelLayoutModel) => {
    if (!isUserResizingRef.current) return;
    nextLayoutRef.current = layout;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    isUserResizingRef.current = true;
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    if (!isUserResizingRef.current) return;
    isUserResizingRef.current = false;

    const nextLayout = nextLayoutRef.current;
    if (nextLayout === null) return;

    persistLayout(nextLayout);
  };

  const setPanels = (ids: PanelId[]) => {
    if (ids.length === 0) return;

    const equalSize = 100 / ids.length;
    const nextLayout = ids.reduce<PanelLayoutModel>((acc, id) => {
      acc[id] = equalSize;
      return acc;
    }, {});

    persistLayout(nextLayout);
  };

  return {
    activePanelIds,
    visiblePanels,
    setPanels,
    panelLayout,
    onPointerUp,
    onPointerDown,
    handleLayoutChange
  };
}

export { useDesktopResizableLayout };
