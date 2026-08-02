import { AuthCommand } from '@mock/modules';
import { createGraphQLErrorResponse } from '@mock/shared';
import { graphqlData } from '@mock/transport/graphql/types';
import { setAuthCookies } from '@mock/transport/http';
import type { LoginMutationVariables } from '@src/common/api/graphql/__generated__';
import type { GraphQLRequestConfig } from 'mock-config-server';

const login: GraphQLRequestConfig = {
  operationType: 'mutation',
  identifier: 'Login',
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
      data: graphqlData<LoginMutationVariables>(({ request }) => {
        const { email, password } = request.body.variables;

        const result = AuthCommand.login(email, password, request.context.orm);

        if (result.success) {
          const { user, ...tokens } = result.data;
          request.tokens = tokens;

          return {
            data: {
              login: user
            }
          };
        }

        return createGraphQLErrorResponse(result.error);
      })
    }
  ]
};

export { login };
