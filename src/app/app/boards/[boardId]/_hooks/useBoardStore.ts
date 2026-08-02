import { useContext } from 'react';
import { useStoreWithEqualityFn } from 'zustand/traditional';

import type { BoardStoreState } from '../_model/store/boardStore';

import { BoardStoreContext } from '../_model/context/boardStoreContext';

function useBoardStore<T>(selector: (state: BoardStoreState) => T) {
  const store = useContext(BoardStoreContext);
  if (!store) throw new Error('BoardProvider is missing');
  return useStoreWithEqualityFn(store, selector);
}

export { useBoardStore };
