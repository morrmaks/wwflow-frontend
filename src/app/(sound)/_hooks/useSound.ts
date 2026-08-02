'use client';

import { useContext } from 'react';

import { SoundContext } from '../_model/soundProvider';

function useSound() {
  const ctx = useContext(SoundContext);

  if (!ctx) throw new Error('useSound must be used inside SoundProvider');

  return ctx;
}

export { useSound };
