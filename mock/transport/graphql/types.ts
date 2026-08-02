import type {
  GraphQLDataResponseFunction,
  GraphQLExecutionResult,
  GraphQLParams
} from 'mock-config-server';

type GraphQLBody<Variables> = {
  variables: Variables;
};

type GraphQLRouteParams<Variables> = GraphQLParams<
  Record<string, unknown>,
  GraphQLBody<Variables>
>;

type GraphQLRouteHandler<Variables> = (params: GraphQLRouteParams<Variables>) => unknown;

const graphqlData =
  <Variables>(handler: GraphQLRouteHandler<Variables>): GraphQLDataResponseFunction =>
  (params) =>
    handler(params as GraphQLRouteParams<Variables>) as GraphQLExecutionResult;

export { graphqlData };
export type { GraphQLRouteParams };
