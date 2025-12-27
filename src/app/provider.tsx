import { ApolloProvider } from '@/shared/providers/apolloProvider';
import { ThemeProvider } from '@/shared/providers/themeProvider';

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </ApolloProvider>
  );
}
