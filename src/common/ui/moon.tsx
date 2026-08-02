'use client';

import type { Transition, Variants } from 'motion/react';
import { motion } from 'motion/react';
import type { HTMLAttributes } from 'react';

import { cn } from '@src/common/lib/utils';

interface MoonIconProps extends HTMLAttributes<HTMLDivElement> {
  isAnimating?: boolean;
  size?: number;
}

const SVG_VARIANTS: Variants = {
  normal: {
    rotate: 0
  },
  animate: {
    rotate: [0, -10, 10, -5, 5, 0]
  }
};

const SVG_TRANSITION: Transition = {
  duration: 1.2,
  ease: 'easeInOut'
};

function MoonIcon({ className, isAnimating = false, size = 28, style, ...props }: MoonIconProps) {
  return (
    <div className={cn(className)} style={{ height: size, width: size, ...style }} {...props}>
      <motion.svg
        animate={isAnimating ? 'animate' : 'normal'}
        className='size-full'
        fill='none'
        height={size}
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        transition={SVG_TRANSITION}
        variants={SVG_VARIANTS}
        viewBox='0 0 24 24'
        width={size}
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z' />
      </motion.svg>
    </div>
  );
}

export { MoonIcon };
