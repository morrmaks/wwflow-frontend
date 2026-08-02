import type { Editor, RecordsDiff, TLRecord, TLStoreSnapshot } from 'tldraw';

import { toast } from 'sonner';

import type { ConnectionState } from '../_model/connectionState';
import type { CanvasWsMessage } from '../_model/сanvasWsMessage';

interface CanvasRuntimeContext {
  editor: Editor;
  setConnection: (state: ConnectionState) => void;
  setName: (title: string) => void;
}

function handleCanvasWsMessage(msg: CanvasWsMessage, ctx: CanvasRuntimeContext) {
  const { editor, setName, setConnection } = ctx;

  switch (msg.type) {
    case 'snapshot':
      setConnection('connected');
      editor.loadSnapshot(msg.snapshot as TLStoreSnapshot);
      setName(msg.title);
      break;

    case 'diff':
      editor.store.applyDiff(msg.diff as RecordsDiff<TLRecord>);
      break;

    case 'title':
      setName(msg.title);
      break;

    case 'error':
      setConnection('error');
      toast.error(msg.message);
      break;
  }
}

export { handleCanvasWsMessage };
