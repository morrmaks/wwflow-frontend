'use client';

import { authStore } from '@src/app/auth';
import { apolloClient } from '@src/common/api/apolloClient/client';
import { GetMeDocument } from '@src/common/api/graphql/__generated__';
import { useEffect } from 'react';

function useGetMeQuery() {
  useEffect(() => {
    apolloClient
      .query({ query: GetMeDocument, fetchPolicy: 'network-only' })
      .then((res) => {
        if (res.data?.me) {
          authStore.get().setAuth(res.data.me);
        } else {
          authStore.get().setGuest();
        }
      })
      .catch(() => authStore.get().setGuest());
  }, []);
}

export { useGetMeQuery };
