import { ApolloLink, HttpLink, Observable } from '@apollo/client';
import { CombinedGraphQLErrors } from '@apollo/client/errors';
import { ErrorLink } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import process from 'node:process';

import type {
  RefreshSessionMutation,
  RefreshSessionMutationVariables
} from '../../graphql/__generated__';

import { RefreshSessionDocument } from '../../graphql/__generated__';
import { apolloClient } from './apolloClient';
import { forceLogout } from './session';

let isRefreshing = false;
let pendingRequests: (() => void)[] = [];

const authErrorLink = new ErrorLink(({ error, operation, forward }) => {
  const isAuthError =
    CombinedGraphQLErrors.is(error) &&
    error.errors.some((err) => err.extensions?.code === 'UNAUTHENTICATED');
  if (!isAuthError) return;

  return new Observable((observer) => {
    const retry = () => {
      forward(operation).subscribe({
        next: (value) => observer.next(value),
        error: (err) => observer.error(err),
        complete: () => observer.complete()
      });
    };

    if (isRefreshing) {
      pendingRequests.push(retry);
      return;
    }

    isRefreshing = true;

    apolloClient
      .mutate<RefreshSessionMutation, RefreshSessionMutationVariables>({
        mutation: RefreshSessionDocument
      })
      .then((result) => {
        if (!result.data?.refreshSession) throw new Error('Refresh failed');
        isRefreshing = false;
        pendingRequests.forEach((request) => request());
        pendingRequests = [];
        retry();
      })
      .catch((refreshError) => {
        isRefreshing = false;
        pendingRequests = [];
        observer.error(refreshError); //можно удалить
        forceLogout();
      });
  });
});

const rollbackLink = new ApolloLink((operation, forward) => {
  return new Observable((observer) => {
    const sub = forward(operation).subscribe({
      next: (result) => observer.next(result),

      error: (error) => {
        const { rollbackId, rollbackType, store, cancelOptimistic } = operation.getContext();
        cancelOptimistic?.();

        if (rollbackId && rollbackType && store) {
          store.getState().consumePendingRollback(rollbackType, rollbackId);
        }

        observer.error(error);
      },

      complete: () => observer.complete()
    });

    return () => sub.unsubscribe();
  });
});

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  fetchOptions: {
    credentials: 'include'
  }
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: process.env.NEXT_PUBLIC_GRAPHQL_WS_ENDPOINT!,
    retryAttempts: Infinity
  })
);

const splitLink = ApolloLink.split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return def.kind === 'OperationDefinition' && def.operation === 'subscription';
  },
  wsLink,
  ApolloLink.from([
    // rollbackLink,
    authErrorLink,
    httpLink
  ])
);

export { authErrorLink, httpLink, rollbackLink, splitLink };
