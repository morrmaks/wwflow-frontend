'use client';

import { useBoardListQuery } from '../_hooks/useBoardListQuery';
import { BoardListItem } from './boardListItem';
import { BoardSectionSkeleton } from './boardSectionSkeleton';

function BoardList() {
  const { data, loading, error } = useBoardListQuery();

  if (loading) return <BoardSectionSkeleton />;

  if (error) return <p>Something went wrong</p>;

  return (
    <ul className='grid mt-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {data?.boardList?.map((board) => (
        <li key={board.id}>
          <BoardListItem board={board} />
        </li>
      ))}
    </ul>
  );
}

export { BoardList };
