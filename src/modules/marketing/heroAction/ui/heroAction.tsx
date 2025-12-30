'use client';

import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

import { ROUTES } from '@/common/constants/routes';
import { useAuth } from '@/common/hooks/useAuth';
import { Button } from '@/common/ui/button';

function HeroAction() {
  const { isAuth } = useAuth();

  return (
    <Button asChild className='py-4' size='lg' variant='default'>
      <Link href={isAuth ? ROUTES.appBoards : ROUTES.authLogin}>
        Get started
        <ArrowRightIcon className='ml-1 h-4 w-4' />
      </Link>
    </Button>
  );
}

export { HeroAction };
