import { MoreVerticalIcon } from 'lucide-react';

import { cn } from '@/common/lib/utils';
import { Button } from '@/common/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/common/ui/hover-card';

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
          <Button className='p-2' size='icon' variant='ghost'>
            <MoreVerticalIcon className='w-4 h-4' />
          </Button>
        )}
      </HoverCardTrigger>
      <HoverCardContent className={cn('p-1 w-max', className)}>{children}</HoverCardContent>
    </HoverCard>
  );
}

export { HoverMenu };
