import { useLazyQuery } from '@apollo/client/react';

import type {
  SearchUserEmailsQuery,
  SearchUserEmailsQueryVariables
} from '@/common/api/graphql/__generated__';

import { SearchUserEmailsDocument } from '@/common/api/graphql/__generated__';

function useSearchUserEmailsQuery() {
  const [search, { data, loading }] = useLazyQuery<
    SearchUserEmailsQuery,
    SearchUserEmailsQueryVariables
  >(SearchUserEmailsDocument, {
    fetchPolicy: 'no-cache'
  });

  return {
    search,
    emails: data?.searchUserEmails.map((e) => e.email) ?? [],
    loading
  };
}

export { useSearchUserEmailsQuery };
