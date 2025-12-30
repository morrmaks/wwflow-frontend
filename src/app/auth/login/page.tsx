import type { Metadata } from 'next';

import { LoginForm } from '@/modules/auth';

export const metadata: Metadata = {
  title: 'Login'
};

export default function LoginPage() {
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='w-full max-w-md'>
        <LoginForm />
      </div>
    </div>
  );
}
