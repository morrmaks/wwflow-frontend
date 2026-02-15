import { LayoutGridIcon } from 'lucide-react';

import { cn } from '@/common/lib/utils';
import { Button } from '@/common/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/common/ui/sheet';

import { NavigationMenu } from './navigationMenu';

function NavigationSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className='h-4 w-4 pointer-events-auto' size='icon' variant='ghost'>
          <LayoutGridIcon />
        </Button>
      </SheetTrigger>
      <SheetContent
        className={cn(
          'sm:rounded-2xl rounded-none',
          'top-1/2 -translate-y-1/2',
          'sm:h-[98vh] h-full w-64 sm:left-4 left-0'
        )}
        side='left'
      >
        <SheetHeader>
          <SheetTitle>WWFlow</SheetTitle>
        </SheetHeader>
        <NavigationMenu />
      </SheetContent>
    </Sheet>
  );
}

export { NavigationSidebar };
