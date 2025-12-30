import { PrivateGuard } from '@/common/guards/privateGuard';

export default function AppLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PrivateGuard>{children}</PrivateGuard>;
}
