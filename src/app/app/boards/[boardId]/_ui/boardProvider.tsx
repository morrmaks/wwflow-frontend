import type { BoardSnapshotFragment } from '@src/common/api/graphql/__generated__';

import { useRef } from 'react';

import type { BoardStore } from '../_model/store/boardStore';

import { BoardDndProvider } from '../(board-dnd)';
import { CreateCardUIProvider } from '../(events)';
import { BoardStoreContext } from '../_model/context/boardStoreContext';
import { createBoardStore } from '../_model/store/boardStore';

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
