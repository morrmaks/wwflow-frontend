import { Card, CardFooter } from '@src/common/ui/card';
import { Skeleton } from '@src/common/ui/skeleton';

function BoardListItemSkeleton() {
  return (
    <Card className='pt-0 overflow-hidden'>
      <div className='aspect-video w-full'>
        <Skeleton className='h-full w-full rounded-lg' />
      </div>

      <CardFooter className='flex flex-col gap-3'>
        <div className='flex items-center justify-between w-full gap-2'>
          <Skeleton className='h-5 w-2/3' />
          <Skeleton className='h-8 w-8 rounded-md' />
        </div>

        <div className='flex items-end justify-between gap-2 w-full'>
          <div className='flex items-center gap-3'>
            <Skeleton className='h-6 w-14 rounded-full' />
            <Skeleton className='h-6 w-16 rounded-full' />
          </div>

          <Skeleton className='h-4 w-20' />
        </div>
      </CardFooter>
    </Card>
  );
}

export { BoardListItemSkeleton };
