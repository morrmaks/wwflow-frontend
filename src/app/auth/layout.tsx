import { PublicGuard } from '@/common/guards/publicGuard';

export default function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PublicGuard>
      <main className='min-h-screen font-sans'>{children}</main>
    </PublicGuard>
  );
}
