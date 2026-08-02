import { cn } from '@src/common/lib/utils';
import { Skeleton } from '@src/common/ui/skeleton';

function HeaderSkeleton() {
  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50',
        'h-[var(--header-height)]',
        'bg-background/10 backdrop-blur-md'
      )}
    >
      <div className='w-full mx-auto flex justify-between h-full max-w-7xl items-center px-4 sm:px-6'>
        <div className='flex items-center gap-4'>
          <Skeleton className='h-5 w-5 rounded-md' />
          <Skeleton className='h-6 w-24' />
        </div>

        <div className='flex items-center gap-4'>
          <Skeleton className='h-8 w-8 rounded-full' />
          <Skeleton className='h-9 w-20 rounded-md' />
        </div>
      </div>
    </header>
  );
}

export { HeaderSkeleton };
