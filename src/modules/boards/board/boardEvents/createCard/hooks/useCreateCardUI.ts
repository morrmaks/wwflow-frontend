import { useContext } from 'react';

import { CreateCardUIContext } from '../model/createCardContext';

function useCreateCardUI() {
  const ctx = useContext(CreateCardUIContext);
  if (!ctx) {
    throw new Error('useCreateCardUI must be used inside BoardProvider');
  }
  return ctx;
}

export { useCreateCardUI };
