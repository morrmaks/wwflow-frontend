import { useContext } from 'react';

import { BoardStoreContext } from '../_model/context/boardStoreContext';

function useBoardStoreApi() {
  const store = useContext(BoardStoreContext);
  if (!store) throw new Error('BoardProvider is missing');
  return store;
}

export { useBoardStoreApi };
