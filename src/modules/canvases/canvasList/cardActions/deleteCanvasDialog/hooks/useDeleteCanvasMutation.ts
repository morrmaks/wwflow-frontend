import { useMutation } from '@apollo/client/react';

import type {
  DeleteCanvasMutation,
  DeleteCanvasMutationVariables
} from '@/common/api/graphql/__generated__';

import { removeCanvasFromCache } from '@/common/api/apolloClient/client';
import { DeleteCanvasDocument } from '@/common/api/graphql/__generated__';
import { appToast } from '@/common/lib/toast';

function useDeleteCanvasMutation() {
  return useMutation<DeleteCanvasMutation, DeleteCanvasMutationVariables>(DeleteCanvasDocument, {
    onCompleted: (data) => {
      if (data?.deleteCanvas?.id) removeCanvasFromCache(data.deleteCanvas.id);
      appToast.success('Canvas deleted successfully');
    },
    onError: (error) => appToast.error('Error deleting canvas', error.message)
  });
}

export { useDeleteCanvasMutation };
