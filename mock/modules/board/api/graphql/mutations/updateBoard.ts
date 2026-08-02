import type { UpdateBoardMutationVariables } from '@src/common/api/graphql/__generated__';
import type { GraphQLRequestConfig } from 'mock-config-server';

import { BoardCommand } from '@mock/modules';
import { createGraphQLErrorResponse, createMockPreviewUrl } from '@mock/shared';
import { requireAuth } from '@mock/transport/auth';
import { graphqlData } from '@mock/transport/graphql/types';
import { setAuthCookies } from '@mock/transport/http';

const updateBoard: GraphQLRequestConfig = {
  operationType: 'mutation',
  identifier: 'UpdateBoard',
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
      data: graphqlData<UpdateBoardMutationVariables>(async ({ request }) => {
        const error = requireAuth(request);
        if (error) return error;

        const { boardId, input } = request.body.variables;
        const previewUrl = await createMockPreviewUrl(input.previewImage, 'board-preview');

        const result = BoardCommand.updateBoard(
          boardId,
          input,
          request.user?.id || '',
          request.context.orm,
          previewUrl
        );

        if (result.success) {
          return {
            data: {
              updateBoard: result.data
            }
          };
        }

        return createGraphQLErrorResponse(result.error);
      })
    }
  ]
};

export { updateBoard };
