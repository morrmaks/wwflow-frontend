import type { Editor } from 'tldraw';

import { appToast } from '@src/common/lib/toast';
import { useState } from 'react';

import type { ConnectionState } from '../_model/connectionState';
import type { CanvasWsMessage } from '../_model/сanvasWsMessage';

import { handleCanvasWsMessage } from '../_lib/handleCanvasWsMessage';
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
