import { BoardListItemSkeleton } from './boardListItemSkeleton';

function BoardSectionSkeleton() {
  return (
    <ul className='grid mt-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {Array.from({ length: 6 }).map((_, i) => (
        <li key={i}>
          <BoardListItemSkeleton />
        </li>
      ))}
    </ul>
  );
}

export { BoardSectionSkeleton };
