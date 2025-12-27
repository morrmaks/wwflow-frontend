'use client';

import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider as ApolloClientProvider } from '@apollo/client/react';
import process from 'node:process';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  fetchOptions: {
    credentials: 'include'
  }
});

export const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('accessToken');

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      ...(token && { Authorization: `Bearer ${token}` })
    }
  }));

  return forward(operation);
});

const apolloClient = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache()
});

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  return <ApolloClientProvider client={apolloClient}>{children}</ApolloClientProvider>;
}
