'use client';

import { useSoundEffect } from '@src/app/(sound)';

import type { Theme } from '../_model/types';
import { useTheme } from './useTheme';

function useThemeChange() {
  const { resolvedTheme, setTheme, theme } = useTheme();
  const themeSwitchSound = useSoundEffect('/sounds/theme-switch.mp3');

  const handleThemeChange = (nextTheme: Theme) => {
    themeSwitchSound.play();
    setTheme(nextTheme);
  };

  return {
    setTheme: handleThemeChange,
    resolvedTheme,
    theme
  };
}

export { useThemeChange };
