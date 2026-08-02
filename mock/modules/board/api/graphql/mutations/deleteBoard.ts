import type { DeleteBoardMutationVariables } from '@src/common/api/graphql/__generated__';
import type { GraphQLRequestConfig } from 'mock-config-server';

import { BoardCommand } from '@mock/modules';
import { createGraphQLErrorResponse } from '@mock/shared';
import { requireAuth } from '@mock/transport/auth';
import { graphqlData } from '@mock/transport/graphql/types';
import { setAuthCookies } from '@mock/transport/http';

const deleteBoard: GraphQLRequestConfig = {
  operationType: 'mutation',
  identifier: 'DeleteBoard',
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
      data: graphqlData<DeleteBoardMutationVariables>(({ request }) => {
        const error = requireAuth(request);
        if (error) return error;

        const { boardId } = request.body.variables;

        const result = BoardCommand.deleteBoard(
          boardId,
          request.user?.id || '',
          request.context.orm
        );

        if (result.success) {
          return {
            data: {
              deleteBoard: result.data
            }
          };
        }

        return createGraphQLErrorResponse(result.error);
      })
    }
  ]
};

export { deleteBoard };
