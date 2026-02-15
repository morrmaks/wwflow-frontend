import { useQuery } from '@apollo/client/react';

import type { BoardListQuery, BoardListQueryVariables } from '@/common/api/graphql/__generated__';

import { BoardListDocument } from '@/common/api/graphql/__generated__';

function useBoardsListQuery() {
  return useQuery<BoardListQuery, BoardListQueryVariables>(BoardListDocument);
}

export { useBoardsListQuery };
