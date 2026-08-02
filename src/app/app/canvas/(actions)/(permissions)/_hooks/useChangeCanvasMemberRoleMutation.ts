import type {
  ChangeCanvasMemberRoleMutation,
  ChangeCanvasMemberRoleMutationVariables
} from '@src/common/api/graphql/__generated__';

import { useMutation } from '@apollo/client/react';
import { ChangeCanvasMemberRoleDocument } from '@src/common/api/graphql/__generated__';
import { appToast } from '@src/common/lib/toast';

import { updateCanvasListRole, updateCanvasPermissionsMyRole } from '../../../_model/cache';

function useChangeCanvasMemberRoleMutation() {
  return useMutation<ChangeCanvasMemberRoleMutation, ChangeCanvasMemberRoleMutationVariables>(
    ChangeCanvasMemberRoleDocument,
    {
      onCompleted: (data) => {
        const { canvasId, updatedMembers } = data.changeCanvasMemberRole;
        updatedMembers.forEach((member) => {
          if (member.isSelf) {
            updateCanvasPermissionsMyRole(canvasId, member.role);
            updateCanvasListRole(canvasId, member.role);
          }
        });

        appToast.success('Role changed successfully');
      },
      onError: (error) => appToast.error('Error changing role', error.message)
    }
  );
}

export { useChangeCanvasMemberRoleMutation };
