'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function useThemeClient() {
  const themeApi = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return {
    mounted,
    ...themeApi
  };
}
