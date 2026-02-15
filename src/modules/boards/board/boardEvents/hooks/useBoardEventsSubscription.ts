import { useSubscription } from '@apollo/client/react';

import type {
  BoardEventsSubscription,
  BoardEventsSubscriptionVariables
} from '@/common/api/graphql/__generated__';

import { BoardEventsDocument } from '@/common/api/graphql/__generated__';

function useBoardEventsSubscription(boardId: string) {
  return useSubscription<BoardEventsSubscription, BoardEventsSubscriptionVariables>(
    BoardEventsDocument,
    {
      variables: { boardId }
    }
  );
}

export { useBoardEventsSubscription };
