'use client';

import { useAudio, type UseAudioOptions } from '@siberiacancode/reactuse';
import { useCallback } from 'react';

import { useSound } from './useSound';

type SoundEffectOptions = Omit<UseAudioOptions, 'immediately'>;

function useSoundEffect(src: string, options?: SoundEffectOptions) {
  const audio = useAudio(src, { interrupt: true, volume: options?.volume ?? 0.35, ...options });
  const { isSoundEnabled } = useSound();

  const play = useCallback(
    async (sprite?: string) => {
      if (!isSoundEnabled) return;

      await audio.play(sprite);
    },
    [audio, isSoundEnabled]
  );

  const playForced = useCallback(
    async (sprite?: string) => {
      await audio.play(sprite);
    },
    [audio]
  );

  return {
    ...audio,
    play,
    playForced
  };
}

export { useSoundEffect };
