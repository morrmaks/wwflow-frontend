import { useResizeObserver } from '@siberiacancode/reactuse';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { ROUTES } from '@/common/constants/routes';
import { useScrollActivity } from '@/common/hooks/useScrollActivity';
import { useThemeClient } from '@/common/hooks/useThemeClient';

import type { LiquidScene } from '../model/createLiquidScene';

import { createLiquidScene } from '../model/createLiquidScene';

export function useLiquidBackground() {
  const pathname = usePathname();
  const sceneRef = useRef<LiquidScene | null>(null);

  const { resolvedTheme } = useThemeClient();
  const { ref } = useResizeObserver<HTMLDivElement>({
    onChange: ({ contentRect }) => sceneRef.current?.resize(contentRect.width, contentRect.height)
  });

  pathname === ROUTES.main ? sceneRef.current?.start() : sceneRef.current?.stop();

  sceneRef.current?.setTheme(resolvedTheme);

  useScrollActivity(({ progressY }) => sceneRef.current?.setScroll(progressY));

  useEffect(() => {
    if (!ref.current) return;
    sceneRef.current = createLiquidScene(ref.current, resolvedTheme);

    return () => {
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, []);

  return { ref };
}
