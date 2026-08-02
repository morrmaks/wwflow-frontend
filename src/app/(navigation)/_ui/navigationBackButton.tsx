'use client';

import { useHover } from '@siberiacancode/reactuse';
import { Button } from '@src/common/ui/button';
import { ArrowLeftIcon } from '@src/common/ui/arrow-left';
import Link from 'next/link';

import { useNavigationBackButton } from '../_hooks/useNavigationBackButton';

function NavigationBackButton() {
  const { href } = useNavigationBackButton();
  const { ref: linkRef, value: isLinkHovered } = useHover<HTMLAnchorElement>();

  if (!href) return null;

  return (
    <Button asChild aria-label='Go back' size='icon' variant='ghost'>
      <Link ref={linkRef} href={href}>
        <ArrowLeftIcon isAnimating={isLinkHovered} size={20} />
      </Link>
    </Button>
  );
}

export { NavigationBackButton };
