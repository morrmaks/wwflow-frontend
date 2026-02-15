import { useQuery } from '@apollo/client/react';

import type { CanvasListQuery, CanvasListQueryVariables } from '@/common/api/graphql/__generated__';

import { CanvasListDocument } from '@/common/api/graphql/__generated__';

function useCanvasListQuery() {
  return useQuery<CanvasListQuery, CanvasListQueryVariables>(CanvasListDocument);
}

export { useCanvasListQuery };
