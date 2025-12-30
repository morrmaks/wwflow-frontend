import type { Metadata } from 'next';

import { LoginForm } from '@/modules/auth/login';

export const metadata: Metadata = {
  title: 'Login'
};

export default function LoginPage() {
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='w-full max-w-md space-y-8'>
        <h2 className='text-2xl font-bold mb-2 text-center'>Welcome back</h2>
        <p className='mx-auto text-base text-center text-muted-foreground'>Log in to you account</p>
        <LoginForm />
      </div>
    </div>
  );
}
