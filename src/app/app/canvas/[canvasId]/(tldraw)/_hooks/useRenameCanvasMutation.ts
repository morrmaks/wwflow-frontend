import type {
  RenameCanvasMutation,
  RenameCanvasMutationVariables
} from '@src/common/api/graphql/__generated__';

import { useMutation } from '@apollo/client/react';
import { RenameCanvasDocument } from '@src/common/api/graphql/__generated__';
import { appToast } from '@src/common/lib/toast';

function useRenameCanvasMutation() {
  return useMutation<RenameCanvasMutation, RenameCanvasMutationVariables>(RenameCanvasDocument, {
    onError: (error) => {
      appToast.error('Failed to update canvas name', error.message);
    }
  });
}

export { useRenameCanvasMutation };
