import type { CreateCanvasMutationVariables } from '@src/common/api/graphql/__generated__';
import type { GraphQLRequestConfig } from 'mock-config-server';

import { CanvasCommand } from '@mock/modules';
import { createGraphQLErrorResponse, createMockPreviewUrl } from '@mock/shared';
import { requireAuth } from '@mock/transport/auth';
import { graphqlData } from '@mock/transport/graphql/types';
import { setAuthCookies } from '@mock/transport/http';

const createCanvas: GraphQLRequestConfig = {
  operationType: 'mutation',
  identifier: 'CreateCanvas',
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
      data: graphqlData<CreateCanvasMutationVariables>(async ({ request }) => {
        const error = requireAuth(request);
        if (error) return error;

        const { title, previewUrl } = request.body.variables;
        const mockPreviewUrl = await createMockPreviewUrl(previewUrl, 'canvas-preview');

        const result = CanvasCommand.createCanvas(
          title,
          mockPreviewUrl,
          request.user?.id || '',
          request.context.orm
        );

        if (result.success) {
          return {
            data: {
              createCanvas: result.data
            }
          };
        }

        return createGraphQLErrorResponse(result.error);
      })
    }
  ]
};

export { createCanvas };
