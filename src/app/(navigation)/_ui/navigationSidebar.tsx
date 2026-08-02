import { cn } from '@src/common/lib/utils';
import { Button } from '@src/common/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@src/common/ui/sheet';
import { LayoutGridIcon } from 'lucide-react';

import { NavigationMenu } from './navigationMenu';

function NavigationSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild className='cursor-pointer'>
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
