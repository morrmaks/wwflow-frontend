'use client';

import { AnimatePresence, motion } from 'motion/react';

import { MoonIcon } from '@src/common/ui/moon';
import { SunMediumIcon } from '@src/common/ui/sun-medium';

import type { ResolvedTheme } from '../_model/types';

interface AnimatedThemeIconProps {
  isAnimating?: boolean;
  size?: number;
  theme: ResolvedTheme;
}

const iconVariants = {
  animate: {
    opacity: 1,
    rotate: 0,
    scale: 1
  },
  exit: (direction: number) => ({
    opacity: 0,
    rotate: direction * 180,
    scale: 0
  }),
  initial: (direction: number) => ({
    opacity: 0,
    rotate: direction * -180,
    scale: 0
  })
};

function AnimatedThemeIcon({ isAnimating = false, size = 20, theme }: AnimatedThemeIconProps) {
  const direction = theme === 'dark' ? 1 : -1;

  return (
    <span
      aria-hidden='true'
      className='relative inline-grid shrink-0 place-items-center overflow-visible'
      style={{ height: size, width: size }}
    >
      <AnimatePresence custom={direction} initial={false} mode='popLayout'>
        <motion.span
          animate='animate'
          className='absolute inset-0 grid place-items-center'
          custom={direction}
          exit='exit'
          initial='initial'
          key={theme}
          transition={{ duration: 0.32, ease: [0.17, 0.67, 0.2, 1] }}
          variants={iconVariants}
        >
          {theme === 'dark' ? (
            <MoonIcon
              className='size-full [&_svg]:size-full'
              isAnimating={isAnimating}
              size={size}
            />
          ) : (
            <SunMediumIcon
              className='size-full [&_svg]:size-full'
              isAnimating={isAnimating}
              size={size}
            />
          )}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export { AnimatedThemeIcon };
