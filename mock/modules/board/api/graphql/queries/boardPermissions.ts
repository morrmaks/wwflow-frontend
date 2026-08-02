import type { BoardPermissionsQueryVariables } from '@src/common/api/graphql/__generated__';
import type { GraphQLRequestConfig } from 'mock-config-server';

import { BoardQuery } from '@mock/modules';
import { createGraphQLErrorResponse } from '@mock/shared';
import { requireAuth } from '@mock/transport/auth';
import { graphqlData } from '@mock/transport/graphql/types';

const boardPermissions: GraphQLRequestConfig = {
  operationType: 'query',
  identifier: 'BoardPermissions',
  routes: [
    {
      data: graphqlData<BoardPermissionsQueryVariables>(({ request }) => {
        const error = requireAuth(request);
        if (error) return error;

        const { boardId } = request.body.variables;

        const result = BoardQuery.getBoardPermissions(
          boardId,
          request.user?.id || '',
          request.context.orm
        );

        if (result.success)
          return {
            data: {
              boardPermissions: result.data
            }
          };

        return createGraphQLErrorResponse(result.error);
      })
    }
  ]
};

export { boardPermissions };
