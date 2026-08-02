import { useEffect, useRef, useState } from 'react';

import type { PanelId, PanelLayoutModel } from '../../_model/store/boardStoreState';

import { useBoardStore } from '../../_hooks/useBoardStore';
import { useBoardStoreApi } from '../../_hooks/useBoardStoreApi';
import { getBoardId, getPanelLayout } from '../../_model/boardSelectors';

const PANEL_IDS: PanelId[] = ['inbox', 'board'];
const STORAGE_PREFIX = 'wwflow:board-panel-layout';
const ACTIVE_PANEL_STORAGE_PREFIX = 'wwflow:board-active-panel';

function getStorageKey(boardId: string, preferenceKey: string) {
  return `${STORAGE_PREFIX}:${preferenceKey}:${boardId}`;
}

function getActivePanelStorageKey(boardId: string) {
  return `${ACTIVE_PANEL_STORAGE_PREFIX}:mobile:${boardId}`;
}

function isPanelId(value: unknown): value is PanelId {
  return PANEL_IDS.some((id) => id === value);
}

function normalizePanelLayout(value: unknown): PanelLayoutModel | null {
  if (typeof value !== 'object' || value === null) return null;

  const layout = PANEL_IDS.reduce<PanelLayoutModel>((acc, id) => {
    const size = (value as Partial<Record<PanelId, unknown>>)[id];
    if (typeof size === 'number' && Number.isFinite(size) && size > 0) {
      acc[id] = size;
    }
    return acc;
  }, {});

  return Object.keys(layout).length > 0 ? layout : null;
}

function readPanelLayout(boardId: string, preferenceKey: string) {
  if (typeof window === 'undefined') return null;

  try {
    const raw = window.localStorage.getItem(getStorageKey(boardId, preferenceKey));
    return raw ? normalizePanelLayout(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

function writePanelLayout(boardId: string, preferenceKey: string, layout: PanelLayoutModel) {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(getStorageKey(boardId, preferenceKey), JSON.stringify(layout));
  } catch {
    return;
  }
}

function useBoardPanelLayoutPreference(preferenceKey: 'desktop' | 'mobile') {
  const boardId = useBoardStore(getBoardId);
  const panelLayout = useBoardStore(getPanelLayout);
  const store = useBoardStoreApi();
  const hydratedBoardIdRef = useRef<string | null>(null);
  const hydrationKey = `${preferenceKey}:${boardId}`;

  useEffect(() => {
    if (hydratedBoardIdRef.current === hydrationKey) return;
    hydratedBoardIdRef.current = hydrationKey;

    const savedLayout = readPanelLayout(boardId, preferenceKey);
    if (!savedLayout) return;

    store.setState({ panelLayout: savedLayout });
  }, [boardId, hydrationKey, preferenceKey, store]);

  const setPanelLayout = (layout: PanelLayoutModel) => {
    store.setState({ panelLayout: layout });
    writePanelLayout(boardId, preferenceKey, layout);
  };

  return { panelLayout, setPanelLayout };
}

function readActivePanel(boardId: string): PanelId | null {
  if (typeof window === 'undefined') return null;

  try {
    const value = window.localStorage.getItem(getActivePanelStorageKey(boardId));
    return isPanelId(value) ? value : null;
  } catch {
    return null;
  }
}

function writeActivePanel(boardId: string, panelId: PanelId) {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(getActivePanelStorageKey(boardId), panelId);
  } catch {
    return;
  }
}

function useBoardActivePanelPreference(defaultPanel: PanelId = 'board') {
  const boardId = useBoardStore(getBoardId);
  const [activePanel, setActivePanelState] = useState<PanelId>(defaultPanel);

  useEffect(() => {
    setActivePanelState(readActivePanel(boardId) ?? defaultPanel);
  }, [boardId, defaultPanel]);

  const setActivePanel = (panelId: PanelId) => {
    setActivePanelState(panelId);
    writeActivePanel(boardId, panelId);
  };

  return { activePanel, setActivePanel };
}

export { useBoardActivePanelPreference, useBoardPanelLayoutPreference };
