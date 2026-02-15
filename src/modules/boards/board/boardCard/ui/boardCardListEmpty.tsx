import { cn } from '@/common/lib/utils';

interface BoardCardListEmptyProps {
  isOver?: boolean;
}

function BoardCardListEmpty({ isOver }: BoardCardListEmptyProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center max-w-full py-6 mx-1 my-3',
        'border-2 border-dashed border-muted-foreground/50 dark:border-muted rounded-xl',
        'text-sm text-muted-foreground/50 font-semibold',
        'transition-all',
        isOver && 'border-muted-foreground dark:border-muted-foreground text-muted-foreground'
      )}
    >
      Drop card here
    </div>
  );
}

export { BoardCardListEmpty };
