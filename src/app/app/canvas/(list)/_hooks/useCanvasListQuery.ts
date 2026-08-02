import type {
  CanvasListQuery,
  CanvasListQueryVariables
} from '@src/common/api/graphql/__generated__';

import { useQuery } from '@apollo/client/react';
import { CanvasListDocument } from '@src/common/api/graphql/__generated__';

function useCanvasListQuery() {
  return useQuery<CanvasListQuery, CanvasListQueryVariables>(CanvasListDocument);
}

export { useCanvasListQuery };
