import type { MockServerConfig } from 'mock-config-server';

import { COOKIE_TOKEN_KEYS } from '@src/common/constants/storage';

import * as graphQLRequests from '@mock/transport/graphql';
import { TokenGenerator } from '@mock/modules';
import { parseMultipartGraphQLRequest } from '@mock/transport/graphql/multipart';

const publicOperations = ['Login', 'Register', 'RefreshSession'];

const mockServerConfig: MockServerConfig = [
  {
    baseUrl: '/',
    port: 4000,
    staticPath: {
      prefix: '/uploads',
      path: '/mock/uploads'
    },
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization']
    },
    database: {
      data: './mock/infra/database/data.json'
    },
    interceptors: {
      request: async ({ request, getCookie }) => {
        await parseMultipartGraphQLRequest(request);

        const accessToken = getCookie(COOKIE_TOKEN_KEYS.accessToken);
        const operationName = request.graphQL?.operationName;

        if (operationName && publicOperations.includes(operationName)) return;
        if (!accessToken) {
          request.user = undefined;
          return;
        }

        const userData = TokenGenerator.validateAccessToken(accessToken);
        if (!userData) {
          request.user = undefined;
          return;
        }

        request.user = userData;
      }
    }
  },
  {
    name: 'graphql',
    baseUrl: '/graphql',
    configs: Object.values(graphQLRequests)
  }
];

export default mockServerConfig;
