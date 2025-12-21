'use client';

import { useIntersectionObserver } from '@siberiacancode/reactuse';
import clsx from 'clsx';
import { useRef } from 'react';

import type { FadeProps, MotionPrimitiveProps, RevealProps } from './motionTypes';

function MotionPrimitive({ once = false, children }: MotionPrimitiveProps) {
  const hasPlayedOnce = useRef(false);
  const { ref, entries } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.3 });

  const isIntersecting = entries?.[0]?.isIntersecting ?? false;
  if (once && isIntersecting) hasPlayedOnce.current = true;
  const isActive = once ? hasPlayedOnce.current : isIntersecting;

  return <>{children({ ref, isActive })}</>;
}

export function Reveal({ direction = 'up', once, className, children }: RevealProps) {
  return (
    <MotionPrimitive once={once}>
      {({ ref, isActive }) => (
        <div
          ref={ref}
          className={clsx(
            'motion-reveal',
            `motion-reveal-${direction}`,
            isActive && 'is-active',
            className
          )}
        >
          {children}
        </div>
      )}
    </MotionPrimitive>
  );
}

export function Fade({ once, className, children }: FadeProps) {
  return (
    <MotionPrimitive once={once}>
      {({ ref, isActive }) => (
        <div ref={ref} className={clsx('motion-fade', isActive && 'is-active', className)}>
          {children}
        </div>
      )}
    </MotionPrimitive>
  );
}
