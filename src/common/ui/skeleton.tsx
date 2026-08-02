import { cn } from '@src/common/lib/utils';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-xl border-[3px] border-brutal-outline bg-muted',
        className
      )}
      data-slot='skeleton'
      {...props}
    />
  );
}

export { Skeleton };
