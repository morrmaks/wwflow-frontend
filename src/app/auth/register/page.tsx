import type { Metadata } from 'next';

import { RegisterForm } from '@src/app/auth';

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
