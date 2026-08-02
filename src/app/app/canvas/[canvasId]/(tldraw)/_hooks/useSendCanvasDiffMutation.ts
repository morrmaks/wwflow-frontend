import type {
  SendCanvasDiffMutation,
  SendCanvasDiffMutationVariables
} from '@src/common/api/graphql/__generated__';

import { useMutation } from '@apollo/client/react';
import { SendCanvasDiffDocument } from '@src/common/api/graphql/__generated__';
import { appToast } from '@src/common/lib/toast';

function useSendCanvasDiffMutation() {
  return useMutation<SendCanvasDiffMutation, SendCanvasDiffMutationVariables>(
    SendCanvasDiffDocument,
    {
      onError: (error) => {
        appToast.error('Failed to send canvas diff', error.message);
      }
    }
  );
}

export { useSendCanvasDiffMutation };
