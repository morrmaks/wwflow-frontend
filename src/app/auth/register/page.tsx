import type { Metadata } from 'next';

import { RegisterForm } from '@/modules/auth';

export const metadata: Metadata = {
  title: 'Register'
};

export default function RegisterPage() {
  return (
    <div className='page-padding w-full max-w-md'>
      <RegisterForm />
    </div>
  );
}
