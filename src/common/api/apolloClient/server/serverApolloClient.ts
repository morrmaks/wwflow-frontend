import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'cross-fetch';

function createServerApolloClient(cookie?: string) {
  return new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
      fetch,
      credentials: 'include',
      headers: cookie ? { cookie } : undefined
    }),
    cache: new InMemoryCache()
  });
}

export { createServerApolloClient };
