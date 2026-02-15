'use client';

import type { Editor } from 'tldraw';

import { useState } from 'react';
import { Tldraw } from 'tldraw';

import { BrandedMenuPanel } from './brandedMenuPanel';
import { TldrawCanvasRealtime } from './tldrawCanvasRealtime';
import { ThemeSync } from './tldrawThemeSync';

function TldrawCanvas() {
  const [editor, setEditor] = useState<Editor | null>(null);

  return (
    <>
      {editor && <TldrawCanvasRealtime editor={editor} />}
      <Tldraw
        className='tldraw-theme pt-[calc(var(--canvas-title-height)+var(--header-height))] overflow-hidden h-full w-full'
        components={{ MenuPanel: BrandedMenuPanel }}
        onMount={setEditor}
      >
        <ThemeSync />
      </Tldraw>
    </>
  );
}

export { TldrawCanvas };
