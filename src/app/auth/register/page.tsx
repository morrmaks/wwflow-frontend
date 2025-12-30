import type { Metadata } from 'next';

import { RegisterForm } from '@/modules/auth/register';

export const metadata: Metadata = {
  title: 'Register'
};

export default function RegisterPage() {
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='w-full max-w-md space-y-8'>
        <h2 className='text-2xl font-bold mb-2 text-center'>Create your account</h2>
        <p className='mx-auto text-base text-center text-muted-foreground'>
          Get started in seconds
        </p>
        <RegisterForm />
      </div>
    </div>
  );
}
