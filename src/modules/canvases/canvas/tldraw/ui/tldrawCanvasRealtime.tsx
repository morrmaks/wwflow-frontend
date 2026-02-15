'use client';

import type { Editor } from 'tldraw';

import { useParams } from 'next/navigation';

import { CanvasNameInput } from '../../name';
import { useCanvasRealtime } from '../hooks/useCanvasRealtime';

interface Params {
  canvasId: string;
}

interface TldrawCanvasRealtimeProps {
  editor: Editor;
}

function TldrawCanvasRealtime({ editor }: TldrawCanvasRealtimeProps) {
  const { canvasId } = useParams<Params>();
  const { name, updateName } = useCanvasRealtime(canvasId, editor);

  return <CanvasNameInput name={name} onChangeName={updateName} />;
}

export { TldrawCanvasRealtime };
