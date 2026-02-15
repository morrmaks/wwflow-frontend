import { useMutation } from '@apollo/client/react';

import type {
  SendCanvasDiffMutation,
  SendCanvasDiffMutationVariables
} from '@/common/api/graphql/__generated__';

import { SendCanvasDiffDocument } from '@/common/api/graphql/__generated__';
import { appToast } from '@/common/lib/toast';

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
