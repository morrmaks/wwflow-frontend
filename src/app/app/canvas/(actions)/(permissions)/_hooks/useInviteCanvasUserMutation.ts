import type {
  InviteCanvasUserMutation,
  InviteCanvasUserMutationVariables
} from '@src/common/api/graphql/__generated__';

import { useMutation } from '@apollo/client/react';
import { InviteCanvasUserDocument } from '@src/common/api/graphql/__generated__';
import { appToast } from '@src/common/lib/toast';

import { addInviteToCanvasPermissionsCache } from '../../../_model/cache';

function useInviteCanvasUserMutation(canvasId: string) {
  return useMutation<InviteCanvasUserMutation, InviteCanvasUserMutationVariables>(
    InviteCanvasUserDocument,
    {
      onCompleted: (data) => {
        addInviteToCanvasPermissionsCache(canvasId, data.inviteCanvasUser);
        appToast.success('Invite sent successfully');
      },
      onError: (error) => appToast.error('Error sending invite', error.message)
    }
  );
}

export { useInviteCanvasUserMutation };
