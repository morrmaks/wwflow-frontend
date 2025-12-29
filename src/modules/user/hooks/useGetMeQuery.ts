import { useQuery } from '@apollo/client/react';

import type { GetMeQuery, GetMeQueryVariables } from '@/common/api/graphql/__generated__';

import { GetMeDocument } from '@/common/api/graphql/__generated__';

function useGetMeQuery() {
  return useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, {
    fetchPolicy: 'network-only'
  });
}

export { useGetMeQuery };
