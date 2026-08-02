import { MoreVerticalIcon } from 'lucide-react';

import { cn } from '@src/common/lib/utils';
import { Button } from '@src/common/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@src/common/ui/hover-card';

interface HoverMenuProps {
  children: React.ReactNode;
  className?: string;
  trigger?: React.ReactNode;
}

function HoverMenu({ trigger, children, className }: HoverMenuProps) {
  return (
    <HoverCard closeDelay={300} openDelay={150}>
      <HoverCardTrigger asChild>
        {trigger ?? (
          <Button className='p-2 text-muted-foreground hover:text-foreground' size='icon' variant='ghost'>
            <MoreVerticalIcon className='h-4 w-4' />
          </Button>
        )}
      </HoverCardTrigger>
      <HoverCardContent className={cn('w-max min-w-40 p-1', className)}>{children}</HoverCardContent>
    </HoverCard>
  );
}

export { HoverMenu };
