'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { ROUTES } from '../constants/routes';
import { useAuth } from '../hooks/useAuth';
import { AuthStatus } from '../providers/authProvider';
import { Spinner } from '../ui/spinner';

function PrivateGuard({ children }: { children: React.ReactNode }) {
  const { status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === AuthStatus.guest) router.replace(ROUTES.authLogin);
  }, [status, router]);

  if (status === AuthStatus.loading)
    return (
      <div className='fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center'>
        <Spinner className='h-8 w-8' height={32} width={32} />
      </div>
    );

  return children;
}

export { PrivateGuard };
