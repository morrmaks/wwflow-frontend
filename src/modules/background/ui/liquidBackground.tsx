'use client';

import { useLiquidBackground } from '../hooks/useLiquidBackground';

export function LiquidBackground() {
  const { ref } = useLiquidBackground();

  return <div ref={ref} className='pointer-events-none fixed inset-0 -z-10 h-full' />;
}
