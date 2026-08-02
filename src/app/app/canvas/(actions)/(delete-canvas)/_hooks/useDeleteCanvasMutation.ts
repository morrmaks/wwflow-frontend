import type {
  DeleteCanvasMutation,
  DeleteCanvasMutationVariables
} from '@src/common/api/graphql/__generated__';

import { useMutation } from '@apollo/client/react';
import { DeleteCanvasDocument } from '@src/common/api/graphql/__generated__';
import { appToast } from '@src/common/lib/toast';

import { removeCanvasFromCache } from '../../../_model/cache';

function useDeleteCanvasMutation() {
  return useMutation<DeleteCanvasMutation, DeleteCanvasMutationVariables>(DeleteCanvasDocument, {
    onCompleted: (data) => {
      removeCanvasFromCache(data?.deleteCanvas?.id);
      appToast.success('Canvas deleted successfully');
    },
    onError: (error) => appToast.error('Error deleting canvas', error.message)
  });
}

export { useDeleteCanvasMutation };
