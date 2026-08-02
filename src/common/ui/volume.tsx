'use client';

import { AnimatePresence, motion } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { Fragment } from 'react';

import { cn } from '@src/common/lib/utils';

interface VolumeIconProps extends HTMLAttributes<HTMLDivElement> {
  isAnimating?: boolean;
  isMuted?: boolean;
  size?: number;
}

function VolumeIcon({
  className,
  isAnimating = false,
  isMuted = false,
  size = 20,
  style,
  ...props
}: VolumeIconProps) {
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
        <path d='M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z' />
        <AnimatePresence initial={false} mode='wait'>
          {isMuted ? (
            <Fragment key='volume-muted'>
              <motion.line
                animate={{ opacity: 1, pathLength: 1 }}
                exit={{ opacity: 0, pathLength: 0 }}
                initial={{ opacity: 0, pathLength: 0 }}
                transition={{ duration: 0.18 }}
                x1='22'
                x2='16'
                y1='9'
                y2='15'
              />
              <motion.line
                animate={{ opacity: 1, pathLength: 1 }}
                exit={{ opacity: 0, pathLength: 0 }}
                initial={{ opacity: 0, pathLength: 0 }}
                transition={{ delay: 0.05, duration: 0.18 }}
                x1='16'
                x2='22'
                y1='9'
                y2='15'
              />
            </Fragment>
          ) : (
            <Fragment key='volume-enabled'>
              <motion.path
                animate={{
                  opacity: 1,
                  pathLength: isAnimating ? [1, 0.35, 1] : 1
                }}
                d='M16 9a5 5 0 0 1 0 6'
                exit={{ opacity: 0, pathLength: 0 }}
                initial={{ opacity: 0, pathLength: 0 }}
                transition={{ duration: 0.35 }}
              />
              <motion.path
                animate={{
                  opacity: 1,
                  pathLength: isAnimating ? [1, 0.35, 1] : 1
                }}
                d='M19.364 18.364a9 9 0 0 0 0-12.728'
                exit={{ opacity: 0, pathLength: 0 }}
                initial={{ opacity: 0, pathLength: 0 }}
                transition={{ delay: 0.08, duration: 0.35 }}
              />
            </Fragment>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
}

export { VolumeIcon };
