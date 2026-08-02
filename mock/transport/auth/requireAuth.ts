import { createGraphQLErrorResponse } from '../../shared';

type AuthRequest = {
  user?: {
    id: string;
    email: string;
  };
};

const requireAuth = (request: AuthRequest) => {
  if (!request.user) {
    return createGraphQLErrorResponse({
      message: 'Unauthorized',
      code: 'UNAUTHENTICATED'
    });
  }
};

export { requireAuth };
