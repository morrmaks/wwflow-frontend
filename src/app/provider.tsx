import { ThemeProvider } from '@/shared/providers/themeProvider';

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider enableSystem attribute='class' defaultTheme='system' disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
