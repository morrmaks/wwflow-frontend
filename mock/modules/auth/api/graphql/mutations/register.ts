import { AuthCommand } from '@mock/modules';
import { createGraphQLErrorResponse } from '@mock/shared';
import { graphqlData } from '@mock/transport/graphql/types';
import { setAuthCookies } from '@mock/transport/http';
import type { RegisterMutationVariables } from '@src/common/api/graphql/__generated__';
import type { GraphQLRequestConfig } from 'mock-config-server';

const register: GraphQLRequestConfig = {
  operationType: 'mutation',
  identifier: 'Register',
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
      data: graphqlData<RegisterMutationVariables>(({ request }) => {
        const { email, name, password } = request.body.variables;
        const result = AuthCommand.register(email, name, password, request.context.orm);

        if (result.success) {
          const { user, ...tokens } = result.data;
          request.tokens = tokens;

          return {
            data: {
              register: user
            }
          };
        }

        return createGraphQLErrorResponse(result.error);
      })
    }
  ]
};

export { register };
