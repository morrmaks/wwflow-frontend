import { useMutation } from '@apollo/client/react';

import type {
  RenameCanvasMutation,
  RenameCanvasMutationVariables
} from '@/common/api/graphql/__generated__';

import { RenameCanvasDocument } from '@/common/api/graphql/__generated__';
import { appToast } from '@/common/lib/toast';

function useRenameCanvasMutation() {
  return useMutation<RenameCanvasMutation, RenameCanvasMutationVariables>(RenameCanvasDocument, {
    onError: (error) => {
      appToast.error('Failed to update canvas name', error.message);
    }
  });
}

export { useRenameCanvasMutation };
