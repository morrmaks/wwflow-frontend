import { createContext } from 'react';

import type { BoardStore } from './boardStore';

const BoardStoreContext = createContext<BoardStore | null>(null);

export { BoardStoreContext };
