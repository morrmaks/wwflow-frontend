import type {
  InviteBoardUserMutation,
  InviteBoardUserMutationVariables
} from '@src/common/api/graphql/__generated__';

import { useMutation } from '@apollo/client/react';
import { InviteBoardUserDocument } from '@src/common/api/graphql/__generated__';
import { appToast } from '@src/common/lib/toast';

import { addInviteToBoardPermissionsCache } from '../../../_model/cache';

function useInviteBoardUserMutation(boardId: string) {
  return useMutation<InviteBoardUserMutation, InviteBoardUserMutationVariables>(
    InviteBoardUserDocument,
    {
      onCompleted: (data) => {
        addInviteToBoardPermissionsCache(boardId, data.inviteBoardUser);
        appToast.success('Invite sent successfully');
      },
      onError: (error) => appToast.error('Error sending invite', error.message)
    }
  );
}

export { useInviteBoardUserMutation };
