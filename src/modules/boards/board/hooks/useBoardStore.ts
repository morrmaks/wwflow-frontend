import { useContext } from 'react';
import { useStoreWithEqualityFn } from 'zustand/traditional';

import type { BoardStoreState } from '../model/boardStore';

import { BoardStoreContext } from '../model/boardStoreContext';

function useBoardStore<T>(selector: (state: BoardStoreState) => T) {
  const store = useContext(BoardStoreContext);
  if (!store) throw new Error('BoardProvider is missing');
  return useStoreWithEqualityFn(store, selector);
}

export { useBoardStore };
