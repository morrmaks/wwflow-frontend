'use client';

import type { Editor } from 'tldraw';

import { useEffect, useState } from 'react';

import type { ConnectionState } from '../_model/connectionState';

import { bindEditorToRealtime } from '../_lib/bindEditorToRealtime';
import { useCanvasInbound } from './useCanvasInbound';
import { useCanvasOutbound } from './useCanvasOutbound';

function useCanvasRealtime(canvasId: string, editor: Editor) {
  const [connectionState, setConnectionState] = useState<ConnectionState>('connecting');
  const isConnected = connectionState === 'connected';

  const { name } = useCanvasInbound(canvasId, editor, setConnectionState);
  const { sendDiff, updateName } = useCanvasOutbound(canvasId, isConnected);

  useEffect(() => {
    if (!isConnected) return;
    return bindEditorToRealtime(editor, sendDiff);
  }, [editor, sendDiff, isConnected]);

  return {
    name,
    updateName
  };
}

export { useCanvasRealtime };
