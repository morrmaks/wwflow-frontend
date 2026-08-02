import type { CanvasListQueryVariables } from '@src/common/api/graphql/__generated__';
import type { GraphQLRequestConfig } from 'mock-config-server';

import { CanvasQuery } from '@mock/modules';
import { createGraphQLErrorResponse } from '@mock/shared';
import { requireAuth } from '@mock/transport/auth';
import { graphqlData } from '@mock/transport/graphql/types';

const canvasList: GraphQLRequestConfig = {
  operationType: 'query',
  identifier: 'CanvasList',
  routes: [
    {
      // data: (request) => {
      data: graphqlData<CanvasListQueryVariables>(({ request }) => {
        const error = requireAuth(request);
        if (error) return error;

        const result = CanvasQuery.getCanvasList(request.user?.id || '', request.context.orm);

        if (result.success)
          return {
            data: {
              canvasList: result.data
            }
          };

        return createGraphQLErrorResponse(result.error);
      })
    }
  ]
};

export { canvasList };
