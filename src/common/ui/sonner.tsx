'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

function Toaster({ ...props }: ToasterProps) {
  const { resolvedTheme = 'system' } = useTheme();

  return (
    <Sonner theme={resolvedTheme === 'dark' ? 'dark' : 'light'} closeButton richColors {...props} />
  );
}

export { Toaster };
