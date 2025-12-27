import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './src/shared/api/graphql/schema.gql',
  documents: ['src/**/*.gql'],
  ignoreNoDocuments: true,
  generates: {
    './src/shared/api/graphql/__generated__.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
      config: {
        reactApolloVersion: 4,
        defaultScalarType: 'unknown',
        skipTypeNameForRoot: true,
        nonOptionalTypename: false,
        avoidOptionals: false
      }
    }
  }
};

export default config;
