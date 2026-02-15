import { ApolloClient, InMemoryCache } from '@apollo/client';

import { splitLink } from './links';

const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});

export { apolloClient };
