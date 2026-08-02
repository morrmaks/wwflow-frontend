import { CanvasSectionSkeleton } from '@src/app/app/canvas';
import { Skeleton } from '@src/common/ui/skeleton';

export default function CanvasLoading() {
  return (
    <div className='page-padding pt-8'>
      <div className='flex justify-between items-center gap-4'>
        <div className='space-y-3'>
          <Skeleton className='h-9 w-35' />
          <Skeleton className='h-4 w-72' />
        </div>

        <Skeleton className='h-9 w-36 rounded-md' />
      </div>

      <CanvasSectionSkeleton />
    </div>
  );
}
