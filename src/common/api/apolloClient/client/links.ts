import { ApolloLink, HttpLink, Observable } from '@apollo/client';
import { CombinedGraphQLErrors } from '@apollo/client/errors';
import { ErrorLink } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { authStore } from '@src/app/auth/_model/store';
import { createClient } from 'graphql-ws';
import { print } from 'graphql';

import type {
  RefreshSessionMutation,
  RefreshSessionMutationVariables
} from '../../graphql/__generated__';

import { RefreshSessionDocument } from '../../graphql/__generated__';
import { apolloClient } from './apolloClient';

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
      .catch(async (refreshError) => {
        isRefreshing = false;
        pendingRequests = [];
        observer.error(refreshError);
        authStore.get().setGuest();
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

function isUpload(value: unknown): value is Blob {
  return typeof Blob !== 'undefined' && value instanceof Blob;
}

function extractUploads(value: unknown, path = 'variables') {
  const files = new Map<string, Blob>();

  function walk(current: unknown, currentPath: string): unknown {
    if (isUpload(current)) {
      files.set(currentPath, current);
      return null;
    }

    if (Array.isArray(current)) {
      return current.map((item, index) => walk(item, `${currentPath}.${index}`));
    }

    if (current && typeof current === 'object') {
      return Object.fromEntries(
        Object.entries(current).map(([key, item]) => [key, walk(item, `${currentPath}.${key}`)])
      );
    }

    return current;
  }

  return {
    files,
    variables: walk(value, path)
  };
}

const multipartUploadLink = new ApolloLink((operation) => {
  return new Observable((observer) => {
    const { files, variables } = extractUploads(operation.variables);
    const form = new FormData();

    form.append(
      'operations',
      JSON.stringify({
        operationName: operation.operationName,
        query: print(operation.query),
        variables
      })
    );

    form.append(
      'map',
      JSON.stringify(
        Object.fromEntries(
          Array.from(files.keys()).map((filePath, index) => [String(index), [filePath]])
        )
      )
    );

    Array.from(files.values()).forEach((file, index) => {
      form.append(String(index), file);
    });

    fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!, {
      method: 'POST',
      credentials: 'include',
      body: form
    })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw result;
        observer.next(result);
        observer.complete();
      })
      .catch((error) => observer.error(error));
  });
});

const uploadAwareHttpLink = ApolloLink.split(
  (operation) => extractUploads(operation.variables).files.size > 0,
  multipartUploadLink,
  httpLink
);

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
  ApolloLink.from([rollbackLink, authErrorLink, uploadAwareHttpLink])
);

export {
  authErrorLink,
  httpLink,
  multipartUploadLink,
  rollbackLink,
  splitLink,
  uploadAwareHttpLink
};
