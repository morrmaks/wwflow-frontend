import { LoginFormSkeleton } from '@src/app/auth';

export default function LoginLoader() {
  return (
    <div className='page-padding w-full max-w-md'>
      <LoginFormSkeleton />
    </div>
  );
}
