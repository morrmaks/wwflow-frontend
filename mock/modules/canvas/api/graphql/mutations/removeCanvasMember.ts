import type { RemoveCanvasMemberMutationVariables } from '@src/common/api/graphql/__generated__';
import type { GraphQLRequestConfig } from 'mock-config-server';

import { CanvasPermissions } from '@mock/modules';
import { createGraphQLErrorResponse } from '@mock/shared';
import { requireAuth } from '@mock/transport/auth';
import { graphqlData } from '@mock/transport/graphql/types';
import { setAuthCookies } from '@mock/transport/http';

const removeCanvasMember: GraphQLRequestConfig = {
  operationType: 'mutation',
  identifier: 'RemoveCanvasMember',
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
      data: graphqlData<RemoveCanvasMemberMutationVariables>(({ request }) => {
        const error = requireAuth(request);
        if (error) return error;

        const { memberId } = request.body.variables;

        const result = CanvasPermissions.removeMember(
          memberId,
          request.user?.id || '',
          request.context.orm
        );

        if (result.success) {
          return {
            data: {
              removeCanvasMember: result.data
            }
          };
        }

        return createGraphQLErrorResponse(result.error);
      })
    }
  ]
};

export { removeCanvasMember };
