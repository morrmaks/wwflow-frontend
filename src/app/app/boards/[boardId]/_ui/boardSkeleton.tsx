import { cn } from '@src/common/lib/utils';
import { Skeleton } from '@src/common/ui/skeleton';

import styles from './boardSkeleton.module.css';

const columnCardAnimationClasses = [
  styles.columnCardDelay0,
  styles.columnCardDelay1,
  styles.columnCardDelay2
];

function BoardSkeleton() {
  return (
    <div className='flex flex-1 min-h-0 overflow-hidden'>
      <div className='hidden sm:flex flex-1 min-h-0 items-stretch gap-4 overflow-hidden'>
        <InboxPanelSkeleton />
        <BoardPanelSkeleton />
      </div>

      <div className='flex flex-1 min-h-0 overflow-hidden max-w-full sm:hidden'>
        <div className='flex flex-1 min-h-0 max-w-full'>
          <BoardPanelSkeleton />
        </div>
      </div>
    </div>
  );
}

function PanelHeaderSkeleton({ titleWidth }: { titleWidth: string }) {
  return (
    <div className='p-4 flex justify-between w-full mb-3 items-center bg-background/10'>
      <Skeleton className={`h-5 ${titleWidth}`} />
      <Skeleton className='h-8 w-8 rounded-md' />
    </div>
  );
}

function InboxPanelSkeleton() {
  return (
    <div className='self-stretch sm:rounded-3xl flex flex-col pb-18 sm:pb-10 sm:border-3 bg-muted/40 overflow-hidden min-w-0 min-h-0 sm:w-[272px] sm:flex-none flex-1'>
      <PanelHeaderSkeleton titleWidth='w-18' />

      <div className='p-1 flex flex-col flex-1 min-h-0'>
        <div className='p-1 pb-0'>
          <Skeleton className='h-10 w-full rounded-lg' />
        </div>

        <div className='flex flex-col flex-1 min-h-0 overflow-hidden px-1 py-3'>
          <AnimatedCardSkeleton className={styles.inboxCardDelay} />
        </div>
      </div>
    </div>
  );
}

function BoardPanelSkeleton() {
  return (
    <div className='flex flex-col self-stretch bg-muted/40 sm:rounded-3xl sm:border-3 overflow-hidden min-w-0 min-h-0 flex-1'>
      <PanelHeaderSkeleton titleWidth='w-36' />

      <ul className='flex flex-1 min-h-0 items-stretch gap-4 p-2 pb-19 sm:pb-11 overflow-hidden'>
        {[0, 1, 2].map((column) => (
          <li key={column} className='flex min-h-0 self-stretch'>
            <ColumnSkeleton index={column} />
          </li>
        ))}

        <li className='hidden lg:block'>
          <Skeleton className='h-10 w-64 rounded-xl' />
        </li>
      </ul>
    </div>
  );
}

function ColumnSkeleton({ index }: { index: number }) {
  const animationClassName = columnCardAnimationClasses[index] ?? columnCardAnimationClasses[0];

  return (
    <div className='flex flex-1 flex-col min-h-0 rounded-2xl min-w-64 max-w-90 py-2 border-2 bg-background'>
      <div className='flex justify-between w-full items-center px-3'>
        <Skeleton className='h-5 w-28' />
        <Skeleton className='h-8 w-8 rounded-md' />
      </div>

      <div className='px-1 flex flex-col flex-1 min-h-0 w-full'>
        <div className='flex flex-col flex-1 min-h-0 overflow-hidden px-1 py-3'>
          <AnimatedCardSkeleton className={animationClassName} />
        </div>
      </div>

      <div className='shrink-0 px-2'>
        <Skeleton className='h-10 w-full rounded-lg' />
      </div>
    </div>
  );
}

function AnimatedCardSkeleton({ className }: { className: string }) {
  return <Skeleton className={cn('w-full rounded-lg', styles.animatedCard, className)} />;
}

export { BoardSkeleton };
