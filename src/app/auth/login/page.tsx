import type { Metadata } from 'next';

import { LoginForm } from '@/modules/auth';

export const metadata: Metadata = {
  title: 'Login'
};

export default function LoginPage() {
  return (
    <div className='page-padding w-full max-w-md'>
      <LoginForm />
    </div>
  );
}
