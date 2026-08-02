'use client';

import type { Editor } from 'tldraw';

import { useState } from 'react';
import { Tldraw } from 'tldraw';

import { TldrawCanvasRealtime } from './tldrawCanvasRealtime';
import { ThemeSync } from './tldrawThemeSync';

function TldrawCanvas() {
  const [editor, setEditor] = useState<Editor | null>(null);

  return (
    <>
      <Tldraw
        className='relative tldraw-theme pt-(--header-height) overflow-hidden h-full w-full'
        components={{ MenuPanel: null }}
        onMount={setEditor}
      >
        {editor && <TldrawCanvasRealtime editor={editor} />}
        <ThemeSync />
      </Tldraw>
    </>
  );
}

export { TldrawCanvas };
