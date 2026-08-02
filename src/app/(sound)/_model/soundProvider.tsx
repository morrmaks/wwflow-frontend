'use client';

import { useLocalStorage } from '@siberiacancode/reactuse';
import { createContext, useMemo } from 'react';

interface SoundContextValue {
  isSoundEnabled: boolean;
  setSoundEnabled: (isSoundEnabled: boolean) => void;
  toggleSound: () => void;
}

const SOUND_ENABLED_STORAGE_KEY = 'sound-enabled';

const SoundContext = createContext<SoundContextValue | null>(null);

function SoundProvider({ children }: { children: React.ReactNode }) {
  const { set, value } = useLocalStorage<boolean>(SOUND_ENABLED_STORAGE_KEY, true);
  const isSoundEnabled = value ?? true;

  const valueContext = useMemo(
    () => ({
      isSoundEnabled,
      setSoundEnabled: set,
      toggleSound: () => set(!isSoundEnabled)
    }),
    [isSoundEnabled, set]
  );

  return <SoundContext.Provider value={valueContext}>{children}</SoundContext.Provider>;
}

export { SoundContext, SoundProvider };
