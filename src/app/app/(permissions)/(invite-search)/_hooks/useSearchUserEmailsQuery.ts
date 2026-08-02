import type {
  SearchUserEmailsQuery,
  SearchUserEmailsQueryVariables
} from '@src/common/api/graphql/__generated__';

import { useLazyQuery } from '@apollo/client/react';
import { SearchUserEmailsDocument } from '@src/common/api/graphql/__generated__';

function useSearchUserEmailsQuery() {
  const [search, { data, loading }] = useLazyQuery<
    SearchUserEmailsQuery,
    SearchUserEmailsQueryVariables
  >(SearchUserEmailsDocument, {
    fetchPolicy: 'cache-and-network'
  });

  return {
    search,
    emails: data?.searchUserEmails.map((e) => e.email) ?? [],
    loading
  };
}

export { useSearchUserEmailsQuery };
