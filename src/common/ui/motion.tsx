'use client';

import { Slot } from '@radix-ui/react-slot';
import { useIntersectionObserver } from '@siberiacancode/reactuse';
import clsx from 'clsx';
import { useRef } from 'react';

import styles from './motion.module.css';

interface BaseMotionProps {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
}

interface MotionPrimitiveProps extends Pick<BaseMotionProps, 'once'> {
  children: (args: { ref: React.RefObject<HTMLDivElement>; isActive: boolean }) => React.ReactNode;
}

function MotionPrimitive({ once = false, children }: MotionPrimitiveProps) {
  const hasPlayedOnce = useRef(false);
  const { ref, entries } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.3 });

  const isIntersecting = entries?.[0]?.isIntersecting ?? false;
  if (once && isIntersecting) hasPlayedOnce.current = true;
  const isActive = once ? hasPlayedOnce.current : isIntersecting;

  return <>{children({ ref, isActive })}</>;
}

type RevealDirection = 'down' | 'left' | 'right' | 'up';
interface RevealProps extends BaseMotionProps {
  direction?: RevealDirection;
}

function MotionReveal({ direction = 'up', once, className, children }: RevealProps) {
  const directionClassName = {
    down: styles.revealDown,
    left: styles.revealLeft,
    right: styles.revealRight,
    up: styles.revealUp
  }[direction];

  return (
    <MotionPrimitive once={once}>
      {({ ref, isActive }) => (
        <Slot
          ref={ref}
          className={clsx(styles.reveal, directionClassName, isActive && styles.active, className)}
        >
          {children}
        </Slot>
      )}
    </MotionPrimitive>
  );
}

interface FadeProps extends BaseMotionProps {}

function MotionFade({ once, className, children }: FadeProps) {
  return (
    <MotionPrimitive once={once}>
      {({ ref, isActive }) => (
        <Slot ref={ref} className={clsx(styles.fade, isActive && styles.active, className)}>
          {children}
        </Slot>
      )}
    </MotionPrimitive>
  );
}

export { MotionFade, MotionReveal };
