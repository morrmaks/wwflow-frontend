import { useResizeObserver } from '@siberiacancode/reactuse';
import { useTheme } from '@src/app/(theme)';
import { ROUTES } from '@src/common/constants/routes';
import { useScrollActivity } from '@src/common/hooks/useScrollActivity';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

import type { LiquidScene } from '../_model/createLiquidScene';

import { createLiquidScene } from '../_model/createLiquidScene';

export function useLiquidBackground() {
  const pathname = usePathname();
  const sceneRef = useRef<LiquidScene | null>(null);

  const { resolvedTheme } = useTheme();
  const { ref } = useResizeObserver<HTMLDivElement>({
    onChange: ({ contentRect }) => sceneRef.current?.resize(contentRect.width, contentRect.height)
  });

  useScrollActivity(({ progressY }) => sceneRef.current?.setScroll(progressY));

  pathname === ROUTES.main ? sceneRef.current?.start() : sceneRef.current?.stop();

  sceneRef.current?.setTheme(resolvedTheme);

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
