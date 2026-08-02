import type {
  ChangeBoardMemberRoleMutation,
  ChangeBoardMemberRoleMutationVariables
} from '@src/common/api/graphql/__generated__';

import { useMutation } from '@apollo/client/react';
import { ChangeBoardMemberRoleDocument } from '@src/common/api/graphql/__generated__';
import { appToast } from '@src/common/lib/toast';

import { updateBoardListRole, updateBoardPermissionsMyRole } from '../../../_model/cache';

function useChangeBoardMemberRoleMutation() {
  return useMutation<ChangeBoardMemberRoleMutation, ChangeBoardMemberRoleMutationVariables>(
    ChangeBoardMemberRoleDocument,
    {
      onCompleted: (data) => {
        const { boardId, updatedMembers } = data.changeBoardMemberRole;
        updatedMembers.forEach((member) => {
          if (member.isSelf) {
            updateBoardPermissionsMyRole(boardId, member.role);
            updateBoardListRole(boardId, member.role);
          }
        });

        appToast.success('Role changed successfully');
      },
      onError: (error) => appToast.error('Error changing role', error.message)
    }
  );
}

export { useChangeBoardMemberRoleMutation };
