'use client';

import { MenuIcon } from 'lucide-react';

import { Button } from '@/common/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/common/ui/sheet';

import { NavigationMenu } from './navigationMenu';

function NavigationSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className='rounded-full h-9 w-9 pointer-events-auto' variant='ghost'>
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent
        className='rounded-2xl top-1/2 -translate-y-1/2 h-[98vh] w-64 left-4'
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
