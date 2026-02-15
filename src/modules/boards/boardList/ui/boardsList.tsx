'use client';

import { useBoardsListQuery } from '../hooks/useBoardsListQuery';
import { BoardListItem } from './boardListItem';
import { SkeletonBoardListItem } from './skeletonBoardListItem';

function BoardsList() {
  const { data, loading, error } = useBoardsListQuery();

  if (loading) return <SkeletonBoardListItem />;

  if (error) return <p>Something went wrong</p>;

  return (
    <ul className='grid mt-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {data?.boardList?.map((card) => (
        <li key={card.id}>
          <BoardListItem card={card} />
        </li>
      ))}
    </ul>
  );
}

export { BoardsList };
