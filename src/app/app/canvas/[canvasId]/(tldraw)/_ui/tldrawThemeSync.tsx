'use client';

import { useTheme } from '@src/app/(theme)';
import { useEffect } from 'react';
import { useEditor } from 'tldraw';

function ThemeSync() {
  const editor = useEditor();
  const { theme } = useTheme();

  useEffect(() => {
    if (!editor) return;

    editor.user.updateUserPreferences({
      colorScheme: theme === 'dark' ? 'dark' : 'light'
    });
  }, [editor, theme]);

  return null;
}

export { ThemeSync };
