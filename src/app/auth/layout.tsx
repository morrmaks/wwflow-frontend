import { PublicGuard } from '@/common/guards/publicGuard';

export default function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PublicGuard>
      <div className='flex-1 flex items-center justify-center '>{children}</div>
    </PublicGuard>
  );
}
