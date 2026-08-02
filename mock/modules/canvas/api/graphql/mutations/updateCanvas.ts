import type { UpdateCanvasMutationVariables } from '@src/common/api/graphql/__generated__';
import type { GraphQLRequestConfig } from 'mock-config-server';

import { CanvasCommand } from '@mock/modules';
import { createGraphQLErrorResponse, createMockPreviewUrl } from '@mock/shared';
import { requireAuth } from '@mock/transport/auth';
import { graphqlData } from '@mock/transport/graphql/types';
import { setAuthCookies } from '@mock/transport/http';

const updateCanvas: GraphQLRequestConfig = {
  operationType: 'mutation',
  identifier: 'UpdateCanvas',
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
      data: graphqlData<UpdateCanvasMutationVariables>(async ({ request }) => {
        const error = requireAuth(request);
        if (error) return error;

        const { canvasId, input } = request.body.variables;
        const previewUrl = await createMockPreviewUrl(input.previewImage, 'canvas-preview');

        const result = CanvasCommand.updateCanvas(
          canvasId,
          input,
          request.user?.id || '',
          request.context.orm,
          previewUrl
        );

        if (result.success) {
          return {
            data: {
              updateCanvas: result.data
            }
          };
        }

        return createGraphQLErrorResponse(result.error);
      })
    }
  ]
};

export { updateCanvas };
