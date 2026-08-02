import type { AppOrm } from './orm';

declare module 'express-serve-static-core' {
  interface Request {
    id: number;
    timestamp: number;
    context: {
      orm: AppOrm;
    };
    graphQL: {
      operationType: string;
      operationName?: string;
      query: string;
      variables?: any;
    } | null;
    tokens?: {
      accessToken?: string;
      refreshToken?: string;
    };
    user?: {
      id: string;
      email: string;
    };
  }
}

export {};
