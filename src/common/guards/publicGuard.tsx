'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from '../hooks/useAuth';

function PublicGuard({ children }: { children: React.ReactNode }) {
  const { status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === 'auth') router.replace('/app/boards');
  }, [status, router]);

  if (status === 'loading') return <div>Loading...</div>;

  return children;
}

export { PublicGuard };
