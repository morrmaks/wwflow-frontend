'use client';

import { useHover } from '@siberiacancode/reactuse';
import { useAuth } from '@src/app/auth/_hooks/useAuth';
import { ROUTES } from '@src/common/constants/routes';
import { useHydrated } from '@src/common/hooks/useHydrated';
import { Button } from '@src/common/ui/button';
import { ArrowRightIcon } from '@src/common/ui/arrow-right';
import Link from 'next/link';

function HeroAction() {
  const { isAuth } = useAuth();
  const isHydrated = useHydrated();
  const { ref: linkRef, value: isLinkHovered } = useHover<HTMLAnchorElement>();

  const href = isHydrated && isAuth ? ROUTES.appBoards : ROUTES.authLogin;

  return (
    <Button asChild className='py-4' size='lg' variant='default'>
      <Link ref={linkRef} href={href}>
        Get started
        <ArrowRightIcon className='ml-1 h-4 w-4' isAnimating={isLinkHovered} size={24} />
      </Link>
    </Button>
  );
}

export { HeroAction };
