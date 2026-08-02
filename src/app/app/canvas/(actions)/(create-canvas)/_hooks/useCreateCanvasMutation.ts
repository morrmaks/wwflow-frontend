import type {
  CreateCanvasMutation,
  CreateCanvasMutationVariables
} from '@src/common/api/graphql/__generated__';

import { useMutation } from '@apollo/client/react';
import { CreateCanvasDocument } from '@src/common/api/graphql/__generated__';
import { appToast } from '@src/common/lib/toast';

import { addCanvasToCache } from '../../../_model/cache';

function useCreateCanvasMutation() {
  return useMutation<CreateCanvasMutation, CreateCanvasMutationVariables>(CreateCanvasDocument, {
    onCompleted: (data) => {
      addCanvasToCache(data?.createCanvas);
      appToast.success('Canvas created successfully');
    },
    onError: (error) => {
      appToast.error('Failed to create canvas', error.message);
    }
  });
}

export { useCreateCanvasMutation };
