import { useMemo, useState } from 'react';

import type { CreateCardTarget } from '../model/createCardContext';

import { CreateCardUIContext } from '../model/createCardContext';

function CreateCardUIProvider({ children }: { children: React.ReactNode }) {
  const [target, setTarget] = useState<CreateCardTarget>(null);

  const value = useMemo(
    () => ({
      target,
      open: (t: CreateCardTarget) => setTarget(t),
      close: () => setTarget(null)
    }),
    [target, setTarget]
  );

  return <CreateCardUIContext.Provider value={value}>{children}</CreateCardUIContext.Provider>;
}

export { CreateCardUIProvider };
