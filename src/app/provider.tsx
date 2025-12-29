import { ApolloProvider } from '@/common/providers/apolloProvider';
import { AuthProvider } from '@/common/providers/authProvider';
import { ThemeProvider } from '@/common/providers/themeProvider';

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider>
      <ThemeProvider>
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
