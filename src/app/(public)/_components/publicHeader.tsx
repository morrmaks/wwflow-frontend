'use client';

import Link from 'next/link';

import { ThemeDropdown } from '@/shared/components/themeSwitcher';
import { useScrollActivity } from '@/shared/hooks/useScrollActivity';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

export function PublicHeader() {
  const isScrolling = useScrollActivity(2000);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        isScrolling
          ? 'bg-background/10 backdrop-blur-md shadow-sm pointer-events-auto'
          : 'bg-transparent backdrop-blur-0 pointer-events-none'
      )}
    >
      <div className='w-full mx-auto flex justify-between h-20 max-w-7xl items-center px-6'>
        <Link href='/' className='text-xl font-bold pointer-events-auto'>
          WWFlow
        </Link>
        <div className='flex items-center gap-4 pointer-events-auto'>
          <ThemeDropdown />
          <Button asChild variant='default'>
            <Link href='/login'>Log in</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
