import { useRef } from 'react';

import type { BoardSnapshotFragment } from '@/common/api/graphql/__generated__';

import type { BoardStore } from '../model';

import { BoardDndProvider } from '../boardDnd';
import { CreateCardUIProvider } from '../boardEvents';
import { BoardStoreContext, createBoardStore } from '../model';

interface BoardProviderProps {
  children: React.ReactNode;
  initialBoard: BoardSnapshotFragment;
}

function BoardProvider({ initialBoard, children }: BoardProviderProps) {
  const storeRef = useRef<BoardStore | null>(null);
  if (!storeRef.current) storeRef.current = createBoardStore(initialBoard);

  return (
    <BoardStoreContext.Provider value={storeRef.current}>
      <CreateCardUIProvider>
        <BoardDndProvider>{children}</BoardDndProvider>
      </CreateCardUIProvider>
    </BoardStoreContext.Provider>
  );
}

export { BoardProvider };
