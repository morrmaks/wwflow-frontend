import { useQuery } from '@apollo/client/react';

import type {
  BoardSnapshotQuery,
  BoardSnapshotQueryVariables
} from '@/common/api/graphql/__generated__';

import { BoardSnapshotDocument } from '@/common/api/graphql/__generated__';

function useBoardSnapshotQuery(boardId: string) {
  return useQuery<BoardSnapshotQuery, BoardSnapshotQueryVariables>(BoardSnapshotDocument, {
    variables: { boardId }
  });
}

export { useBoardSnapshotQuery };
