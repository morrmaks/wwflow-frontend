import type { ServiceError } from './service';

function createGraphQLErrorResponse(error: ServiceError) {
  return {
    data: null,
    errors: [
      {
        message: error.message,
        extensions: {
          code: error.code
        }
      }
    ]
  };
}

export { createGraphQLErrorResponse };
