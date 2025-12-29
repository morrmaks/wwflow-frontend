import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';

import { authErrorLink, httpLink } from './links';

const apolloClient = new ApolloClient({
  link: ApolloLink.from([authErrorLink, httpLink]),
  cache: new InMemoryCache()
});

export { apolloClient };
