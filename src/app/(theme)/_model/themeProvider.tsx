'use client';

import { COOKIE_THEME_KEY } from '@src/common/constants/storage';
import { createContext, useEffect, useMemo, useRef, useState } from 'react';

import type { ResolvedTheme, Theme } from './types';

import { applyTheme, getCookieTheme, resolveSystemTheme, startThemeViewTransition } from './utils';

interface ThemeContextValue {
  resolvedTheme: ResolvedTheme;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getCookieTheme);
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light');
  const hasMounted = useRef(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const resolve = (): ResolvedTheme => (theme === 'system' ? resolveSystemTheme() : theme);

    const update = () => {
      const resolved = resolve();
      if (hasMounted.current) {
        startThemeViewTransition(() => applyTheme(resolved));
      } else {
        applyTheme(resolved);
        hasMounted.current = true;
      }
      setResolvedTheme(resolved);
    };

    update();

    document.cookie = `${COOKIE_THEME_KEY}=${theme}; path=/; max-age=31536000`;

    if (theme === 'system') {
      media.addEventListener('change', update);
      return () => media.removeEventListener('change', update);
    }
  }, [theme]);

  const value = useMemo(() => ({ theme, resolvedTheme, setTheme }), [theme, resolvedTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export { ThemeContext, ThemeProvider };
