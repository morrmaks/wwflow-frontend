import type { BoardListQueryVariables } from '@src/common/api/graphql/__generated__';
import type { GraphQLRequestConfig } from 'mock-config-server';

import { BoardQuery } from '@mock/modules';
import { createGraphQLErrorResponse } from '@mock/shared';
import { requireAuth } from '@mock/transport/auth';
import { graphqlData } from '@mock/transport/graphql/types';

const boardList: GraphQLRequestConfig = {
  operationType: 'query',
  identifier: 'BoardList',
  routes: [
    {
      data: graphqlData<BoardListQueryVariables>(({ request }) => {
        const error = requireAuth(request);
        if (error) return error;

        const result = BoardQuery.getBoardList(request.user?.id || '', request.context.orm);

        if (result.success)
          return {
            data: {
              boardList: result.data
            }
          };

        return createGraphQLErrorResponse(result.error);
      })
    }
  ]
};

export { boardList };
