import type { CanvasPermissionsQueryVariables } from '@src/common/api/graphql/__generated__';
import type { GraphQLRequestConfig } from 'mock-config-server';

import { CanvasQuery } from '@mock/modules';
import { createGraphQLErrorResponse } from '@mock/shared';
import { requireAuth } from '@mock/transport/auth';
import { graphqlData } from '@mock/transport/graphql/types';

const canvasPermissions: GraphQLRequestConfig = {
  operationType: 'query',
  identifier: 'CanvasPermissions',
  routes: [
    {
      // data: (request) => {
      data: graphqlData<CanvasPermissionsQueryVariables>(({ request }) => {
        const error = requireAuth(request);
        if (error) return error;

        const { canvasId } = request.body.variables;

        const result = CanvasQuery.getCanvasPermissions(
          canvasId,
          request.user?.id || '',
          request.context.orm
        );

        if (result.success) {
          return {
            data: {
              canvasPermissions: result.data
            }
          };
        }

        return createGraphQLErrorResponse(result.error);
      })
    }
  ]
};

export { canvasPermissions };
