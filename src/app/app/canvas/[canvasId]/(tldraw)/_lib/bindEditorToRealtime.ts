import type { Editor } from 'tldraw';

function bindEditorToRealtime(editor: Editor, sendDiff: (diff: unknown) => void) {
  return editor.store.listen(
    (event) => {
      if (event.source !== 'user') return;
      sendDiff(event.changes);
    },
    { source: 'all' }
  );
}

export { bindEditorToRealtime };
