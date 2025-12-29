import { HttpLink, Observable } from '@apollo/client';
import { CombinedGraphQLErrors } from '@apollo/client/errors';
import { ErrorLink } from '@apollo/client/link/error';
import process from 'node:process';

import { RefreshSessionDocument } from '../graphql/__generated__';
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
      .mutate({ mutation: RefreshSessionDocument })
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

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  fetchOptions: {
    credentials: 'include'
  }
});

export { authErrorLink, httpLink };
