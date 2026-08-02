'use client';

import { useParams } from 'next/navigation';

import { BoardEvents } from '../(events)';
import { ResizableLayout } from '../(resizable-layout)';
import { useBoardSnapshotQuery } from '../_hooks/useBoardSnapshotQuery';
import { BoardProvider } from './boardProvider';
import { BoardSkeleton } from './boardSkeleton';

interface Params extends Record<string, string | string[]> {
  boardId: string;
}

function Board() {
  const { boardId } = useParams<Params>();
  const { data, loading } = useBoardSnapshotQuery(boardId);
  if (loading) return <BoardSkeleton />;

  if (!data?.board) return <div>Board not found</div>;

  return (
    <BoardProvider initialBoard={data.board}>
      <BoardEvents boardId={data.board.id} />
      <ResizableLayout />
    </BoardProvider>
  );
}

export { Board };
