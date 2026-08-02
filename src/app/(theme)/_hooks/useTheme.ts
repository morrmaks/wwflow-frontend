'use client';

import { useContext } from 'react';

import { ThemeContext } from '../_model/themeProvider';

function useTheme() {
  const ctx = useContext(ThemeContext);

  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');

  return ctx;
}

export { useTheme };
