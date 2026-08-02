'use client';

import type { Editor } from 'tldraw';

import { EditableInput } from '@src/common/ui/editable-input';
import { useParams } from 'next/navigation';
import { DefaultMainMenu, DefaultMainMenuContent, DefaultPageMenu } from 'tldraw';

import { useCanvasRealtime } from '../_hooks/useCanvasRealtime';

interface Params {
  canvasId: string;
}

interface TldrawCanvasRealtimeProps {
  editor: Editor;
}

function TldrawCanvasRealtime({ editor }: TldrawCanvasRealtimeProps) {
  const { canvasId } = useParams<Params>();
  const { name, updateName } = useCanvasRealtime(canvasId, editor);

  return (
    <div className='absolute flex tlui-style-panel__wrapper p-1'>
      <DefaultMainMenu>
        <DefaultMainMenuContent />
        <div className='absolute tlui-style-panel__wrapper ml-0'>
          <DefaultPageMenu />
        </div>
      </DefaultMainMenu>

      <EditableInput
        className='text-base font-bold rounded-md bg-input/50 dark:bg-input/50 hover:bg-input hover:dark:bg-input'
        name='canvas-name'
        value={name}
        onSubmit={updateName}
      />
    </div>
  );
}

export { TldrawCanvasRealtime };
