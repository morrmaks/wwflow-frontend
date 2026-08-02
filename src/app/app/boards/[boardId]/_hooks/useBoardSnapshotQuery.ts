import type {
  BoardSnapshotQuery,
  BoardSnapshotQueryVariables
} from '@src/common/api/graphql/__generated__';

import { useQuery } from '@apollo/client/react';
import { BoardSnapshotDocument } from '@src/common/api/graphql/__generated__';

function useBoardSnapshotQuery(boardId: string) {
  return useQuery<BoardSnapshotQuery, BoardSnapshotQueryVariables>(BoardSnapshotDocument, {
    variables: { boardId },
    fetchPolicy: 'network-only'
  });
}

export { useBoardSnapshotQuery };
