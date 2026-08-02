import type {
  CanvasSessionSubscription,
  CanvasSessionSubscriptionVariables
} from '@src/common/api/graphql/__generated__';

import { useSubscription } from '@apollo/client/react';
import { CanvasSessionDocument } from '@src/common/api/graphql/__generated__';

interface CanvasSessionSubscriptionHandlers {
  onData: (options: useSubscription.OnDataOptions<CanvasSessionSubscription>) => void;
  onError: (error: Error) => void;
}

function useCanvasSessionSubscription(id: string, ctx: CanvasSessionSubscriptionHandlers) {
  return useSubscription<CanvasSessionSubscription, CanvasSessionSubscriptionVariables>(
    CanvasSessionDocument,
    {
      variables: { id },
      onData: ctx.onData,
      onError: ctx.onError
    }
  );
}

export { useCanvasSessionSubscription };
