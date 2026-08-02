'use client';

import { useIntersectionObserver } from '@siberiacancode/reactuse';
import { NavigationBackButton, NavigationSidebar } from '@src/app/(navigation)';
import { SoundToggle } from '@src/app/(sound)';
import { ThemeDropdown } from '@src/app/(theme)';
import { UserMenu } from '@src/app/auth';
import { useAuth } from '@src/app/auth/_hooks/useAuth';
import { ROUTES } from '@src/common/constants/routes';
import { cn } from '@src/common/lib/utils';
import { Button } from '@src/common/ui/button';
import { Logo } from '@src/common/ui/logo';
import Link from 'next/link';

import { HeaderSkeleton } from './headerSkeleton';

export function Header() {
  const { isAuth, isLoading } = useAuth();
  const { ref, entries } = useIntersectionObserver();

  const isCovered = entries?.[0] && entries[0].isIntersecting;

  const setSentinelRef = (node: HTMLDivElement | null) => {
    if (node) ref(node);
  };

  if (isLoading) return <HeaderSkeleton />;

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50',
          'transition-all duration-500',
          'h-[var(--header-height)]',
          isCovered
            ? 'bg-transparent backdrop-blur-0 pointer-events-none'
            : 'bg-background/10 backdrop-blur-md shadow-sm pointer-events-auto'
        )}
      >
        <div className='w-full mx-auto grid h-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6'>
          <div className='flex justify-start items-center gap-2 pointer-events-auto'>
            {isAuth && (
              <>
                <NavigationSidebar />
                <NavigationBackButton />
              </>
            )}
          </div>
          <div className='flex justify-center'>
            <Logo />
          </div>
          <div className='flex items-center justify-end gap-4 pointer-events-auto'>
            {isAuth ? (
              <div className='hidden items-center gap-4 md:flex'>
                <SoundToggle />
                <ThemeDropdown />
              </div>
            ) : (
              <>
                <SoundToggle />
                <ThemeDropdown />
              </>
            )}
            {isAuth ? (
              <UserMenu />
            ) : (
              <Button asChild variant='default'>
                <Link href={ROUTES.authLogin}>Log in</Link>
              </Button>
            )}
          </div>
        </div>
      </header>
      <div ref={setSentinelRef}></div>
    </>
  );
}
