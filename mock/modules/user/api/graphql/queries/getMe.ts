import type { GraphQLRequestConfig } from 'mock-config-server';

import { setAuthCookies } from '@mock/transport/http';
import { requireAuth } from '@mock/transport/auth';
import { createGraphQLErrorResponse } from '@mock/shared';
import { graphqlData } from '@mock/transport/graphql/types';
import { UserQuery } from '@mock/modules';
import type { GetMeQueryVariables } from '@src/common/api/graphql/__generated__';

const getMe: GraphQLRequestConfig = {
  operationType: 'query',
  identifier: 'GetMe',
  interceptors: {
    response: (_data, params) => {
      setAuthCookies(params);
      return _data;
    }
  },
  routes: [
    {
      // data: (request) => {
      data: graphqlData<GetMeQueryVariables>(({ request }) => {
        const error = requireAuth(request);
        if (error) return error;

        const result = UserQuery.getMe(request.user?.id || '', request.context.orm);

        if (result.success) {
          request.user = result.data;

          return {
            data: {
              me: result.data
            }
          };
        }

        return createGraphQLErrorResponse(result.error);
      })
    }
  ]
};

export { getMe };
