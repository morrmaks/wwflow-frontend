import { createContext } from 'react';

import type { BoardStore } from '../store/boardStore';

const BoardStoreContext = createContext<BoardStore | null>(null);

export { BoardStoreContext };
