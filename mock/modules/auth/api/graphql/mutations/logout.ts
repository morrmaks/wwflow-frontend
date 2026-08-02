import type { GraphQLRequestConfig } from 'mock-config-server';

import { clearAuthCookies } from '@mock/transport/http';
import { requireAuth } from '@mock/transport/auth';
import { createGraphQLErrorResponse } from '@mock/shared';
import { AuthCommand } from '@mock/modules';
import { graphqlData } from '@mock/transport/graphql/types';
import type { LogoutMutationVariables } from '@src/common/api/graphql/__generated__';

const logout: GraphQLRequestConfig = {
  operationType: 'mutation',
  identifier: 'Logout',
  interceptors: {
    response: (_data, params) => {
      clearAuthCookies(params);
      return _data;
    }
  },
  routes: [
    {
      data: graphqlData<LogoutMutationVariables>(({ request }) => {
        const error = requireAuth(request);
        if (error) return error;

        const refreshToken = request.cookies?.refreshToken;
        const result = AuthCommand.logout(refreshToken, request.context.orm);

        if (result.success) return { data: result.data };

        return createGraphQLErrorResponse(result.error);
      })
    }
  ]
};

export { logout };
