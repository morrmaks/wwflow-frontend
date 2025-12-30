import type { Metadata } from 'next';

import { RegisterForm } from '@/modules/auth';

export const metadata: Metadata = {
  title: 'Register'
};

export default function RegisterPage() {
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='w-full max-w-md'>
        <RegisterForm />
      </div>
    </div>
  );
}
