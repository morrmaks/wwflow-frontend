'use client';

import type { Variants } from 'motion/react';
import { motion } from 'motion/react';
import type { HTMLAttributes } from 'react';

import { cn } from '@src/common/lib/utils';

interface SunMediumIconProps extends HTMLAttributes<HTMLDivElement> {
  isAnimating?: boolean;
  size?: number;
}

interface Ray {
  d: string;
  x: number;
  y: number;
}

const CIRCLE_VARIANTS: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 1.12, 1],
    transition: { duration: 0.45, ease: 'easeOut' }
  }
};

const RAY_VARIANTS: Variants = {
  normal: { x: 0, y: 0 },
  animate: ({ index, x, y }: Ray & { index: number }) => ({
    x: [0, x * 1.6, 0],
    y: [0, y * 1.6, 0],
    transition: { delay: index * 0.03, duration: 0.45, ease: 'easeOut' }
  })
};

const rays: Ray[] = [
  { d: 'M12 3v1', x: 0, y: -1 },
  { d: 'M12 20v1', x: 0, y: 1 },
  { d: 'M3 12h1', x: -1, y: 0 },
  { d: 'M20 12h1', x: 1, y: 0 },
  { d: 'm18.364 5.636-.707.707', x: 1, y: -1 },
  { d: 'm6.343 17.657-.707.707', x: -1, y: 1 },
  { d: 'm5.636 5.636.707.707', x: -1, y: -1 },
  { d: 'm17.657 17.657.707.707', x: 1, y: 1 }
];

function SunMediumIcon({
  className,
  isAnimating = false,
  size = 28,
  style,
  ...props
}: SunMediumIconProps) {
  return (
    <div className={cn(className)} style={{ height: size, width: size, ...style }} {...props}>
      <svg
        className='size-full'
        fill='none'
        height={size}
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        viewBox='0 0 24 24'
        width={size}
        xmlns='http://www.w3.org/2000/svg'
      >
        <motion.circle
          animate={isAnimating ? 'animate' : 'normal'}
          cx='12'
          cy='12'
          r='4'
          style={{ originX: '12px', originY: '12px' }}
          variants={CIRCLE_VARIANTS}
        />
        {rays.map((ray, index) => (
          <motion.path
            animate={isAnimating ? 'animate' : 'normal'}
            custom={{ ...ray, index }}
            d={ray.d}
            key={ray.d}
            variants={RAY_VARIANTS}
          />
        ))}
      </svg>
    </div>
  );
}

export { SunMediumIcon };
