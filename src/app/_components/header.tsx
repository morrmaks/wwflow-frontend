'use client';

import { useIntersectionObserver } from '@siberiacancode/reactuse';
import Link from 'next/link';

import { ROUTES } from '@/common/constants/routes';
import { useAuth } from '@/common/hooks/useAuth';
import { cn } from '@/common/lib/utils';
import { Button } from '@/common/ui/button';
import { Logo } from '@/common/ui/logo';
import { NavigationSidebar } from '@/modules/navigation';
import { ThemeDropdown } from '@/modules/theme';
import { UserMenu } from '@/modules/user';

export function Header() {
  const { isAuth } = useAuth();
  const { ref, entries } = useIntersectionObserver();

  const isCovered = entries?.[0] && entries[0].isIntersecting;

  const setSentinelRef = (node: HTMLDivElement | null) => {
    if (node) ref(node);
  };

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
        <div className='w-full mx-auto flex justify-between h-full max-w-7xl items-center px-4 sm:px-6'>
          {isAuth && <NavigationSidebar />}
          <Logo />
          <div className='flex items-center gap-4 pointer-events-auto'>
            {isAuth ? (
              <UserMenu />
            ) : (
              <>
                <ThemeDropdown />
                <Button asChild variant='default'>
                  <Link href={ROUTES.authLogin}>Log in</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>
      <div ref={setSentinelRef}></div>
    </>
  );
}
