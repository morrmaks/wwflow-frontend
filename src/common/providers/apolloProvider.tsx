'use client';

import { ApolloProvider as ApolloClientProvider } from '@apollo/client/react';

import { apolloClient } from '../api/client/apolloClient';

function ApolloProvider({ children }: { children: React.ReactNode }) {
  return <ApolloClientProvider client={apolloClient}>{children}</ApolloClientProvider>;
}

export { apolloClient, ApolloProvider };
