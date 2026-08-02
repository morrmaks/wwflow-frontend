'use client';

import { useAuth } from '@src/app/auth/_hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { ROUTES } from '../constants/routes';

function PrivateGuard({ children }: { children: React.ReactNode }) {
  const { isGuest } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isGuest) router.replace(ROUTES.authLogin);
  }, [isGuest, router]);

  return children;
}

export { PrivateGuard };
