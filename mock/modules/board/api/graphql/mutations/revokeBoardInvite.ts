import type { RevokeBoardInviteMutationVariables } from '@src/common/api/graphql/__generated__';
import type { GraphQLRequestConfig } from 'mock-config-server';

import { BoardPermissions } from '@mock/modules';
import { createGraphQLErrorResponse } from '@mock/shared';
import { requireAuth } from '@mock/transport/auth';
import { graphqlData } from '@mock/transport/graphql/types';
import { setAuthCookies } from '@mock/transport/http';

const revokeBoardInvite: GraphQLRequestConfig = {
  operationType: 'mutation',
  identifier: 'RevokeBoardInvite',
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
      data: graphqlData<RevokeBoardInviteMutationVariables>(({ request }) => {
        const error = requireAuth(request);
        if (error) return error;

        const { inviteId } = request.body.variables;

        const result = BoardPermissions.revokeInvite(
          inviteId,
          request.user?.id || '',
          request.context.orm
        );

        if (result.success) {
          return {
            data: {
              revokeBoardInvite: result.data
            }
          };
        }

        return createGraphQLErrorResponse(result.error);
      })
    }
  ]
};

export { revokeBoardInvite };
