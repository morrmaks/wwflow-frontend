import { useMutation } from '@apollo/client/react';

import type {
  UpdateCanvasMutation,
  UpdateCanvasMutationVariables
} from '@/common/api/graphql/__generated__';

import { updateCanvasInCache } from '@/common/api/apolloClient/client';
import { UpdateCanvasDocument } from '@/common/api/graphql/__generated__';
import { appToast } from '@/common/lib/toast';

function useUpdateCanvasMutation() {
  return useMutation<UpdateCanvasMutation, UpdateCanvasMutationVariables>(UpdateCanvasDocument, {
    onCompleted: (data) => {
      updateCanvasInCache(data?.updateCanvas);
      appToast.success('Canvas updated successfully');
    },
    onError: (error) => appToast.error('Error updating canvas', error.message)
  });
}

export { useUpdateCanvasMutation };
