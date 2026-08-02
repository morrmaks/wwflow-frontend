import type {
  UpdateCanvasMutation,
  UpdateCanvasMutationVariables
} from '@src/common/api/graphql/__generated__';

import { useMutation } from '@apollo/client/react';
import { UpdateCanvasDocument } from '@src/common/api/graphql/__generated__';
import { appToast } from '@src/common/lib/toast';

import { updateCanvasInCache } from '../../../_model/cache';

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
