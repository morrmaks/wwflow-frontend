import { useContext } from 'react';

import { BoardStoreContext } from '../model/boardStoreContext';

function useBoardStoreApi() {
  const store = useContext(BoardStoreContext);
  if (!store) throw new Error('BoardProvider is missing');
  return store;
}

export { useBoardStoreApi };
