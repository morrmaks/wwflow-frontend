import type { ChangeCanvasMemberRoleMutationVariables } from '@src/common/api/graphql/__generated__';
import type { GraphQLRequestConfig } from 'mock-config-server';

import { CanvasPermissions } from '@mock/modules';
import { createGraphQLErrorResponse } from '@mock/shared';
import { requireAuth } from '@mock/transport/auth';
import { graphqlData } from '@mock/transport/graphql/types';
import { setAuthCookies } from '@mock/transport/http';

const changeCanvasMemberRole: GraphQLRequestConfig = {
  operationType: 'mutation',
  identifier: 'ChangeCanvasMemberRole',
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
      data: graphqlData<ChangeCanvasMemberRoleMutationVariables>(({ request }) => {
        const error = requireAuth(request);
        if (error) return error;

        const { input } = request.body.variables;
        const { memberId, role } = input;

        const result = CanvasPermissions.changeRole(
          memberId,
          role,
          request.user?.id || '',
          request.context.orm
        );

        if (result.success) {
          return {
            data: {
              changeCanvasMemberRole: result.data
            }
          };
        }

        return createGraphQLErrorResponse(result.error);
      })
    }
  ]
};

export { changeCanvasMemberRole };
