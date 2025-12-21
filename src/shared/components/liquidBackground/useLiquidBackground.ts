import { useResizeObserver } from '@siberiacancode/reactuse';
import { useEffect, useRef } from 'react';

import { useScrollActivity } from '@/shared/hooks/useScrollActivity';
import { useThemeClient } from '@/shared/hooks/useThemeClient';

import type { LiquidScene } from './createLiquidScene';

import { createLiquidScene } from './createLiquidScene';

export function useLiquidBackground() {
  const sceneRef = useRef<LiquidScene | null>(null);

  const { resolvedTheme } = useThemeClient();
  const { ref, entry } = useResizeObserver<HTMLDivElement>();

  useScrollActivity(({ progressY }) => sceneRef.current?.setScroll(progressY));

  useEffect(() => {
    if (!ref.current) return;
    sceneRef.current = createLiquidScene(ref.current, resolvedTheme);

    return () => {
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, []);

  useEffect(() => sceneRef.current?.setTheme(resolvedTheme), [resolvedTheme]);
  useEffect(
    () => entry && sceneRef.current?.resize(entry.contentRect.width, entry.contentRect.height),
    [entry]
  );

  return { ref };
}
