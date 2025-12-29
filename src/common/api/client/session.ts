import type { GetMeQuery } from '@/common/api/graphql/__generated__';

import { GetMeDocument } from '@/common/api/graphql/__generated__';
import { apolloClient } from '@/common/providers/apolloProvider';

function revalidateGetMeQuery(data: GetMeQuery['me']) {
  apolloClient.writeQuery({
    query: GetMeDocument,
    data: { me: data }
  });
}

function forceLogout() {
  revalidateGetMeQuery(null);
}

export { forceLogout, revalidateGetMeQuery };
