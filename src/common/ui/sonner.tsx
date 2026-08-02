'use client';

import { useTheme } from '@src/app/(theme)';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

function Toaster({ ...props }: ToasterProps) {
  const { resolvedTheme = 'system' } = useTheme();

  return (
    <Sonner
      closeButton
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      toastOptions={{
        classNames: {
          toast:
            'group/toast rounded-xl! border-[3px]! border-brutal-outline! bg-card! text-card-foreground! shadow-none! font-sans!',
          title: 'text-current! font-bold!',
          description: 'text-current! opacity-80!',
          success: 'bg-toast-success! text-toast-success-foreground!',
          error: 'bg-toast-error! text-toast-error-foreground!',
          warning: 'bg-toast-warning! text-toast-warning-foreground!',
          info: 'bg-toast-info! text-toast-info-foreground!',
          icon: 'text-current!',
          closeButton:
            'border-[2px]! border-brutal-outline! bg-card! text-card-foreground! shadow-none! transition-bg! hover:bg-accent!',
          actionButton:
            'rounded-lg! border-[3px]! border-current! bg-primary! px-3! py-1.5! font-bold! text-primary-foreground! shadow-none! transition-opacity! hover:opacity-80!',
          cancelButton:
            'rounded-lg! border-[3px]! border-current! bg-transparent! px-3! py-1.5! font-bold! text-current! shadow-none! transition-opacity! hover:opacity-70!'
        }
      }}
      {...props}
    />
  );
}

export { Toaster };
