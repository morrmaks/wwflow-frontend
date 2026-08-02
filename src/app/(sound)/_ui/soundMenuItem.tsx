'use client';

import { DropdownMenuItem } from '@src/common/ui/dropdown-menu';
import { VolumeIcon } from '@src/common/ui/volume';

import { useSoundToggle } from '../_hooks/useSoundToggle';

function SoundMenuItem() {
  const { handleToggleSound, isSoundEnabled } = useSoundToggle();

  return (
    <DropdownMenuItem
      aria-pressed={isSoundEnabled}
      onSelect={(event) => {
        event.preventDefault();
        handleToggleSound();
      }}
    >
      <VolumeIcon isMuted={!isSoundEnabled} size={16} />
      {isSoundEnabled ? 'Sound on' : 'Sound off'}
    </DropdownMenuItem>
  );
}

export { SoundMenuItem };
