import type {
  BoardPermissionsQuery,
  BoardPermissionsQueryVariables
} from '@src/common/api/graphql/__generated__';

import { useQuery } from '@apollo/client/react';
import { BoardPermissionsDocument } from '@src/common/api/graphql/__generated__';

function useBoardPermissionsQuery(boardId: string) {
  return useQuery<BoardPermissionsQuery, BoardPermissionsQueryVariables>(BoardPermissionsDocument, {
    variables: {
      boardId
    }
  });
}

export { useBoardPermissionsQuery };
