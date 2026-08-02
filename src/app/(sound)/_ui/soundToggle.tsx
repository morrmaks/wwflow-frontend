'use client';

import { Button } from '@src/common/ui/button';
import { VolumeIcon } from '@src/common/ui/volume';

import { useSoundToggle } from '../_hooks/useSoundToggle';

function SoundToggle() {
  const { handleToggleSound, isHovered, isSoundEnabled, toggleButtonRef } = useSoundToggle();

  return (
    <Button
      ref={toggleButtonRef}
      aria-label={isSoundEnabled ? 'Disable sounds' : 'Enable sounds'}
      aria-pressed={isSoundEnabled}
      onClick={handleToggleSound}
      size='icon'
      variant='ghost'
    >
      <VolumeIcon isAnimating={isHovered} isMuted={!isSoundEnabled} />
    </Button>
  );
}

export { SoundToggle };
