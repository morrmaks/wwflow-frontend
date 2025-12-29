'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from '../hooks/useAuth';

function PrivateGuard({ children }: { children: React.ReactNode }) {
  const { status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === 'guest') router.replace('/auth/login');
  }, [status, router]);

  if (status === 'loading') return <div>Loading...</div>;

  return children;
}

export { PrivateGuard };
