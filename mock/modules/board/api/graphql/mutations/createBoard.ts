import type { CreateBoardMutationVariables } from '@src/common/api/graphql/__generated__';
import type { GraphQLRequestConfig } from 'mock-config-server';

import { BoardCommand } from '@mock/modules';
import { createGraphQLErrorResponse, createMockPreviewUrl } from '@mock/shared';
import { requireAuth } from '@mock/transport/auth';
import { graphqlData } from '@mock/transport/graphql/types';
import { setAuthCookies } from '@mock/transport/http';

const createBoard: GraphQLRequestConfig = {
  operationType: 'mutation',
  identifier: 'CreateBoard',
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
      data: graphqlData<CreateBoardMutationVariables>(async ({ request }) => {
        const error = requireAuth(request);
        if (error) return error;

        const { title, previewUrl } = request.body.variables;
        const mockPreviewUrl = await createMockPreviewUrl(previewUrl, 'board-preview');

        const result = BoardCommand.createBoard(
          title,
          mockPreviewUrl,
          request.user?.id || '',
          request.context.orm
        );

        if (result.success) {
          return {
            data: {
              createBoard: result.data
            }
          };
        }

        return createGraphQLErrorResponse(result.error);
      })
    }
  ]
};

export { createBoard };
