import { useRef } from 'react';

import { typedKeys } from '@/common/lib/utils';

import type { PanelId, PanelLayoutModel } from '../../model';

import { useUpdatePanelLayoutMutation } from '../../boardEvents';
import { useBoardOperations } from '../../hooks/useBoardOperations';
import { useBoardStore } from '../../hooks/useBoardStore';
import { getBoardId, getPanelLayout } from '../../model/boardSelectors';
import { resizablePanelsTabsConfig } from '../model/resizablePanelsTabsConfig';

function useDesktopResizableLayout() {
  const boardId = useBoardStore(getBoardId);
  const panelLayout = useBoardStore(getPanelLayout);

  const { updatePanelLayoutOperation } = useBoardOperations();
  const [updateLayout] = useUpdatePanelLayoutMutation();

  const isUserResizingRef = useRef(false);
  const nextLayoutRef = useRef<PanelLayoutModel | null>(null);

  const visiblePanels = resizablePanelsTabsConfig.filter(
    (p) => panelLayout[p.id] !== undefined && panelLayout[p.id]! > 0
  );

  const persistLayout = (nextLayout: PanelLayoutModel) => {
    updatePanelLayoutOperation({ panelLayout: nextLayout });
    updateLayout({
      variables: { boardId, panelLayout: nextLayout }
    });
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

  const togglePanel = (id: PanelId) => {
    const nextLayout = { ...panelLayout };
    const panelIds = typedKeys(nextLayout);
    const panelCount = panelIds.length;

    if (nextLayout[id] !== undefined && nextLayout[id] > 0) {
      if (panelCount === 1) return;
      delete nextLayout[id];
    } else {
      const count = panelCount + 1;
      const equalSize = 100 / count;

      panelIds.forEach((key) => {
        nextLayout[key] = equalSize;
      });
      nextLayout[id] = equalSize;
    }

    persistLayout(nextLayout);
  };

  return {
    visiblePanels,
    togglePanel,
    panelLayout,
    onPointerUp,
    onPointerDown,
    handleLayoutChange
  };
}

export { useDesktopResizableLayout };
