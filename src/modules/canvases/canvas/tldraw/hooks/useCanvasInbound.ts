import type { Editor } from 'tldraw';

import { useState } from 'react';

import { appToast } from '@/common/lib/toast';

import type { ConnectionState } from '../model/connectionState';
import type { CanvasWsMessage } from '../model/сanvasWsMessage';

import { handleCanvasWsMessage } from '../lib/handleCanvasWsMessage';
import { useCanvasSessionSubscription } from './useCanvasSessionSubscription';

function useCanvasInbound(
  canvasId: string,
  editor: Editor,
  setConnection: (connection: ConnectionState) => void
) {
  const [name, setName] = useState<string>('');

  useCanvasSessionSubscription(canvasId, {
    onData: ({ data }) => {
      const msg = data?.data?.canvasSession as CanvasWsMessage;
      if (!msg) return;

      handleCanvasWsMessage(msg, { editor, setName, setConnection });
    },
    onError: (error) => {
      setConnection('error');
      appToast.error('Failed to subscribe to canvas session', error.message);
    }
  });

  return { name };
}

export { useCanvasInbound };
