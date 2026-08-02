import type {
  BoardEventsSubscription,
  BoardEventsSubscriptionVariables
} from '@src/common/api/graphql/__generated__';

import { useSubscription } from '@apollo/client/react';
import { BoardEventsDocument } from '@src/common/api/graphql/__generated__';

import { useBoardStore } from '../../_hooks/useBoardStore';
import { getApplyEvent } from '../../_model/boardSelectors';

function useBoardEventsSubscription(boardId: string) {
  const applyEvent = useBoardStore(getApplyEvent);

  return useSubscription<BoardEventsSubscription, BoardEventsSubscriptionVariables>(
    BoardEventsDocument,
    {
      onData: ({ data }) => {
        if (data?.data?.boardEvents) applyEvent(data.data.boardEvents);
      },
      variables: { boardId }
    }
  );
}

export { useBoardEventsSubscription };
