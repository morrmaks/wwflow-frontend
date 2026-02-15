import { useMutation } from '@apollo/client/react';

import type {
  CreateCanvasMutation,
  CreateCanvasMutationVariables
} from '@/common/api/graphql/__generated__';

import { CreateCanvasDocument } from '@/common/api/graphql/__generated__';
import { appToast } from '@/common/lib/toast';

function useCreateCanvasMutation() {
  return useMutation<CreateCanvasMutation, CreateCanvasMutationVariables>(CreateCanvasDocument, {
    onCompleted: () => {
      appToast.success('Canvas created successfully');
    },
    onError: (error) => {
      appToast.error('Failed to create canvas', error.message);
    }
  });
}

export { useCreateCanvasMutation };
