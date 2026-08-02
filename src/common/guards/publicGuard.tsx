'use client';

import { useAuth } from '@src/app/auth/_hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { ROUTES } from '../constants/routes';

function PublicGuard({ children }: { children: React.ReactNode }) {
  const { isAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuth) router.replace(ROUTES.appBoards);
  }, [isAuth, router]);

  return children;
}

export { PublicGuard };
