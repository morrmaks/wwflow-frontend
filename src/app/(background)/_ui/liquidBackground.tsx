'use client';

import { ROUTES } from '@src/common/constants/routes';
import { usePathname } from 'next/navigation';

import { useLiquidBackground } from '../_hooks/useLiquidBackground';

function LiquidBackgroundCanvas() {
  const { ref } = useLiquidBackground();

  return (
    <div
      ref={ref}
      aria-hidden='true'
      className='pointer-events-none fixed inset-0 -z-10 h-dvh overflow-hidden'
    >
      <div className='absolute inset-0 -z-11 bg-background' />
    </div>
  );
}

export function LiquidBackground() {
  const pathname = usePathname();

  if (pathname !== ROUTES.main) return null;

  return <LiquidBackgroundCanvas />;
}
