import { LiquidBackground } from '@/shared/components/liquidBackground';

import { PublicHeader } from './_components/publicHeader';

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PublicHeader />
      <LiquidBackground />
      <main className='min-h-screen font-sans'>{children}</main>
    </>
  );
}
