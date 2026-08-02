'use client';

import type { Variants } from 'motion/react';
import { motion } from 'motion/react';
import type { HTMLAttributes } from 'react';

import { cn } from '@src/common/lib/utils';

interface ArrowRightIconProps extends HTMLAttributes<HTMLDivElement> {
  isAnimating?: boolean;
  size?: number;
}

const PATH_VARIANTS: Variants = {
  normal: { d: 'M5 12h14' },
  animate: {
    d: ['M5 12h14', 'M5 12h17', 'M5 12h14'],
    transition: {
      duration: 0.4
    }
  }
};

const SECONDARY_PATH_VARIANTS: Variants = {
  normal: { d: 'm12 5 7 7-7 7', translateX: 0 },
  animate: {
    d: 'm12 5 7 7-7 7',
    translateX: [0, 3, 0],
    transition: {
      duration: 0.4
    }
  }
};

function ArrowRightIcon({
  className,
  isAnimating = false,
  size = 16,
  style,
  ...props
}: ArrowRightIconProps) {
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
        <motion.path
          animate={isAnimating ? 'animate' : 'normal'}
          d='M5 12h14'
          variants={PATH_VARIANTS}
        />
        <motion.path
          animate={isAnimating ? 'animate' : 'normal'}
          d='m12 5 7 7-7 7'
          variants={SECONDARY_PATH_VARIANTS}
        />
      </svg>
    </div>
  );
}

export { ArrowRightIcon };
