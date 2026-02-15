'use client';

import { ApolloProvider as ApolloClientProvider } from '@apollo/client/react';

import { apolloClient } from '../api/apolloClient/client';

interface ApolloProviderProps {
  children: React.ReactNode;
}

function ApolloProvider({ children }: ApolloProviderProps) {
  return <ApolloClientProvider client={apolloClient}>{children}</ApolloClientProvider>;
}

export { ApolloProvider };
