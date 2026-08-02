import type {
  CanvasPermissionsQuery,
  CanvasPermissionsQueryVariables
} from '@src/common/api/graphql/__generated__';

import { useQuery } from '@apollo/client/react';
import { CanvasPermissionsDocument } from '@src/common/api/graphql/__generated__';

function useCanvasPermissionsQuery(canvasId: string) {
  return useQuery<CanvasPermissionsQuery, CanvasPermissionsQueryVariables>(CanvasPermissionsDocument, {
    variables: { canvasId }
  });
}

export { useCanvasPermissionsQuery };
