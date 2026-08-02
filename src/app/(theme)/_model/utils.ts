import { COOKIE_THEME_KEY } from '@src/common/constants/storage';
import { getCookieValue } from '@src/common/lib/cookie';

import type { ResolvedTheme, Theme } from './types';

import { THEMES } from './types';

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { finished: Promise<void>; ready: Promise<void> };
};

function isTheme(value: string | undefined): value is Theme {
  return THEMES.includes(value as Theme);
}

function getCookieTheme(): Theme {
  const value = getCookieValue(COOKIE_THEME_KEY);
  return isTheme(value) ? value : 'system';
}

function resolveSystemTheme(): ResolvedTheme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(resolved: ResolvedTheme) {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(resolved);
  root.style.colorScheme = resolved;
}

function startThemeViewTransition(update: () => void) {
  const viewTransitionDocument = document as ViewTransitionDocument;

  if (!viewTransitionDocument.startViewTransition) {
    update();
    return;
  }

  viewTransitionDocument.startViewTransition(update);
}

export { applyTheme, getCookieTheme, isTheme, resolveSystemTheme, startThemeViewTransition };
