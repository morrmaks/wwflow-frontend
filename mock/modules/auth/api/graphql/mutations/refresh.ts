import type { GraphQLRequestConfig } from 'mock-config-server';

import { createGraphQLErrorResponse } from '@mock/shared';
import { clearAuthCookies, setAuthCookies } from '@mock/transport/http';
import { AuthCommand } from '@mock/modules';
import { graphqlData } from '@mock/transport/graphql/types';
import type { RefreshSessionMutationVariables } from '@src/common/api/graphql/__generated__';

const refresh: GraphQLRequestConfig = {
  operationType: 'mutation',
  identifier: 'RefreshSession',
  interceptors: {
    response: (_data, params) => {
      if (_data.errors && _data.errors.length > 0) {
        params.setStatusCode(401);
        clearAuthCookies(params);
      } else {
        setAuthCookies(params);
      }

      return _data;
    }
  },
  routes: [
    {
      data: graphqlData<RefreshSessionMutationVariables>(({ request }) => {
        const refreshToken = request.cookies?.refreshToken;
        const result = AuthCommand.refresh(refreshToken, request.context.orm);

        if (result.success) {
          const { response, ...tokens } = result.data;

          request.tokens = tokens;

          return {
            data: {
              refreshSession: response
            }
          };
        }

        return createGraphQLErrorResponse(result.error);
      })
    }
  ]
};

export { refresh };
