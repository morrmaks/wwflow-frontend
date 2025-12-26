'use client';

import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { ThemeProvider } from 'next-themes';
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

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache()
});

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider enableSystem attribute='class' defaultTheme='system' disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </ApolloProvider>
  );
}
