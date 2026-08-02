import type { GraphQLRequestConfig } from 'mock-config-server';

import { requireAuth } from '@mock/transport/auth';
import { createGraphQLErrorResponse } from '@mock/shared';
import { graphqlData } from '@mock/transport/graphql/types';
import { UserQuery } from '@mock/modules';
import type { SearchUserEmailsQueryVariables } from '@src/common/api/graphql/__generated__';

const searchUserEmails: GraphQLRequestConfig = {
  operationType: 'query',
  identifier: 'SearchUserEmails',
  routes: [
    {
      // data: (request) => {
      data: graphqlData<SearchUserEmailsQueryVariables>(({ request }) => {
        const error = requireAuth(request);
        if (error) return error;

        const { variables } = request.body;
        const query = variables?.query ?? '';

        const result = UserQuery.searchUserEmails(query ?? '', request.context.orm);

        if (result.success) {
          return {
            data: {
              searchUserEmails: result.data
            }
          };
        }

        return createGraphQLErrorResponse(result.error);
      })
    }
  ]
};

export { searchUserEmails };
