import type {
  BoardEventsSubscription,
  BoardEventsSubscriptionVariables
} from '@src/common/api/graphql/__generated__';
import type {
  GraphqlTransportWsExecutionResult,
  GraphqlTransportWsRequestConfig
} from 'mock-config-server';

import { subscribeBoardEvents } from '@mock/modules/board/domain/board.events';

function keepSubscriptionOpen() {
  return new Promise<GraphqlTransportWsExecutionResult>(() => {});
}

const boardEvents: GraphqlTransportWsRequestConfig = {
  operationType: 'subscription',
  identifier: 'BoardEvents',
  routes: [
    {
      data: ({ next, socket, variables }) => {
        const { boardId } = variables as BoardEventsSubscriptionVariables;

        const unsubscribe = subscribeBoardEvents(boardId, (event) => {
          next({
            data: {
              boardEvents: event
            } satisfies BoardEventsSubscription
          });
        });

        socket.once('close', unsubscribe);

        return keepSubscriptionOpen();
      }
    }
  ]
};

export { boardEvents };
