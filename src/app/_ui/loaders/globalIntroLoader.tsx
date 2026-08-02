'use client';

import { useEffect, useState } from 'react';

import { cn } from '@src/common/lib/utils';

import { IntroLoader } from './introLoader';
import styles from './introLoader.module.css';

type GlobalIntroLoaderState = 'closing' | 'hidden' | 'visible';

function GlobalIntroLoader() {
  const [state, setState] = useState<GlobalIntroLoaderState>('visible');

  useEffect(() => {
    const showTime = 1200;
    const closeDuration = 700;

    const timer1 = setTimeout(() => {
      setState('closing');
    }, showTime);

    const timer2 = setTimeout(() => {
      setState('hidden');
    }, showTime + closeDuration);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (state === 'hidden') return null;

  return (
    <div className={cn(styles['global-intro-loader'], styles[state])}>
      <IntroLoader />
      <span className='absolute bottom-2 font-bold'>WWFlow</span>
    </div>
  );
}

export { GlobalIntroLoader };
