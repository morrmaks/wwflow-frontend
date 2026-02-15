import { useEffect, useRef } from 'react';

import { typedKeys } from '@/common/lib/utils';

import type { PanelId } from '../../model';

import { useUpdatePanelLayoutMutation } from '../../boardEvents';
import { useBoardOperations } from '../../hooks/useBoardOperations';
import { useBoardStore } from '../../hooks/useBoardStore';
import { getBoardId, getPanelLayout } from '../../model';
import { resizablePanelsTabsConfig } from '../model/resizablePanelsTabsConfig';

function useMobileResizableLayout() {
  const didNormalizeRef = useRef(false);

  const boardId = useBoardStore(getBoardId);
  const panelLayout = useBoardStore(getPanelLayout);

  const { updatePanelLayoutOperation } = useBoardOperations();
  const [updateLayout] = useUpdatePanelLayoutMutation();

  const visible = typedKeys(panelLayout);
  const active = visible.includes('board') ? 'board' : visible[0];
  const panel = resizablePanelsTabsConfig.find((p) => p.id === active);

  const persistLayout = (id: PanelId) => {
    const next = { [id]: 100 };
    updatePanelLayoutOperation({ panelLayout: next });
    updateLayout({
      variables: { boardId, panelLayout: next }
    });
  };

  useEffect(() => {
    if (didNormalizeRef.current) return;
    if (visible.length <= 1) return;

    didNormalizeRef.current = true;
    persistLayout(active);
  }, [visible]);

  const togglePanel = (id: PanelId) => persistLayout(id);

  return {
    panel,
    active,
    togglePanel
  };
}

export { useMobileResizableLayout };
