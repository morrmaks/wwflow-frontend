import { SoundProvider } from '@src/app/(sound)';
import { ThemeProvider } from '@src/app/(theme)';
import { ApolloProvider } from '@src/common/providers';

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider>
      <ThemeProvider>
        <SoundProvider>{children}</SoundProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export { Provider };
