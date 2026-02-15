'use client';

import { useEffect } from 'react';
import { useEditor } from 'tldraw';

import { useThemeClient } from '@/common/hooks/useThemeClient';

function ThemeSync() {
  const editor = useEditor();
  const { theme } = useThemeClient();

  useEffect(() => {
    if (!editor) return;

    editor.user.updateUserPreferences({
      colorScheme: theme === 'dark' ? 'dark' : 'light'
    });
  }, [editor, theme]);

  return null;
}

export { ThemeSync };
