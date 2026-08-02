import type { DeleteCanvasMutationVariables } from '@src/common/api/graphql/__generated__';
import type { GraphQLRequestConfig } from 'mock-config-server';

import { CanvasCommand } from '@mock/modules';
import { createGraphQLErrorResponse } from '@mock/shared';
import { requireAuth } from '@mock/transport/auth';
import { graphqlData } from '@mock/transport/graphql/types';
import { setAuthCookies } from '@mock/transport/http';

const deleteCanvas: GraphQLRequestConfig = {
  operationType: 'mutation',
  identifier: 'DeleteCanvas',
  interceptors: {
    response: (_data, params) => {
      if (_data.errors && _data.errors.length > 0) {
        params.setStatusCode(400);
      } else {
        setAuthCookies(params);
      }
      return _data;
    }
  },
  routes: [
    {
      // data: (request) => {
      data: graphqlData<DeleteCanvasMutationVariables>(({ request }) => {
        const error = requireAuth(request);
        if (error) return error;

        const { canvasId } = request.body.variables;

        const result = CanvasCommand.deleteCanvas(
          canvasId,
          request.user?.id || '',
          request.context.orm
        );

        if (result.success) {
          return {
            data: {
              deleteCanvas: result.data
            }
          };
        }

        return createGraphQLErrorResponse(result.error);
      })
    }
  ]
};

export { deleteCanvas };
