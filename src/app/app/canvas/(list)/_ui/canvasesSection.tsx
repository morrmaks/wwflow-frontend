'use client';

import { useCanvasListQuery } from '../_hooks/useCanvasListQuery';
import { CanvasListItem } from './canvasListItem';
import { CanvasSectionSkeleton } from './canvasSectionSkeleton';

function CanvasesSection() {
  const { data, loading, error } = useCanvasListQuery();

  return <CanvasSectionSkeleton />;

  if (error) return <p>Something went wrong</p>;

  return (
    <ul className='grid mt-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {data?.canvasList?.map((canvas) => (
        <li key={canvas.id}>
          <CanvasListItem canvas={canvas} />
        </li>
      ))}
    </ul>
  );
}

export { CanvasesSection };
