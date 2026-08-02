import type {
  BoardListQuery,
  BoardListQueryVariables
} from '@src/common/api/graphql/__generated__';

import { useQuery } from '@apollo/client/react';
import { BoardListDocument } from '@src/common/api/graphql/__generated__';

function useBoardListQuery() {
  return useQuery<BoardListQuery, BoardListQueryVariables>(BoardListDocument);
}

export { useBoardListQuery };
