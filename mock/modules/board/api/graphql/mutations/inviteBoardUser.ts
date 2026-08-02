import type { InviteBoardUserMutationVariables } from '@src/common/api/graphql/__generated__';
import type { GraphQLRequestConfig } from 'mock-config-server';

import { BoardPermissions } from '@mock/modules';
import { createGraphQLErrorResponse } from '@mock/shared';
import { requireAuth } from '@mock/transport/auth';
import { graphqlData } from '@mock/transport/graphql/types';
import { setAuthCookies } from '@mock/transport/http';

const inviteBoardUser: GraphQLRequestConfig = {
  operationType: 'mutation',
  identifier: 'InviteBoardUser',
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
      data: graphqlData<InviteBoardUserMutationVariables>(({ request }) => {
        const error = requireAuth(request);
        if (error) return error;

        const { input } = request.body.variables;
        const { resourceId, email, role } = input;

        const result = BoardPermissions.inviteUser(
          resourceId,
          email,
          role,
          request.user?.id || '',
          request.user?.email || '',
          request.context.orm
        );

        if (result.success) {
          return {
            data: {
              inviteBoardUser: result.data
            }
          };
        }

        return createGraphQLErrorResponse(result.error);
      })
    }
  ]
};

export { inviteBoardUser };
