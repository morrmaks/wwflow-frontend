import { useSubscription } from '@apollo/client/react';

import type {
  CanvasSessionSubscription,
  CanvasSessionSubscriptionVariables
} from '@/common/api/graphql/__generated__';

import { CanvasSessionDocument } from '@/common/api/graphql/__generated__';

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
