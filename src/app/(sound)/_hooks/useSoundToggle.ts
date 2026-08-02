'use client';

import { useHover } from '@siberiacancode/reactuse';

import { useSound } from './useSound';
import { useSoundEffect } from './useSoundEffect';

function useSoundToggle() {
  const { isSoundEnabled, toggleSound } = useSound();
  const soundOff = useSoundEffect('/sounds/sound-off.mp3');
  const soundOn = useSoundEffect('/sounds/sound-on.mp3');
  const { ref: toggleButtonRef, value: isHovered } = useHover<HTMLButtonElement>();

  const handleToggleSound = () => {
    if (isSoundEnabled) soundOff.play();
    else soundOn.playForced();

    toggleSound();
  };

  return {
    handleToggleSound,
    isHovered,
    isSoundEnabled,
    toggleButtonRef
  };
}

export { useSoundToggle };
