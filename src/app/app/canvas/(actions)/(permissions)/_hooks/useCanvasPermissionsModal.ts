import type { CanvasListFieldsFragment, MemberRole } from '@src/common/api/graphql/__generated__';

import { useCanvasPermissionsQuery } from './useCanvasPermissionsQuery';
import { useChangeCanvasMemberRoleMutation } from './useChangeCanvasMemberRoleMutation';
import { useInviteCanvasUserMutation } from './useInviteCanvasUserMutation';
import { useRemoveCanvasMemberMutation } from './useRemoveCanvasMemberMutation';
import { useRevokeCanvasInviteMutation } from './useRevokeCanvasInviteMutation';

function useCanvasPermissionsModal(canvas: CanvasListFieldsFragment) {
  const { data } = useCanvasPermissionsQuery(canvas.id);

  const members = data?.canvasPermissions?.members || [];
  const invites = data?.canvasPermissions?.invites || [];

  const [changeRole] = useChangeCanvasMemberRoleMutation();
  const [removeMember] = useRemoveCanvasMemberMutation();
  const [sendInvite] = useInviteCanvasUserMutation(canvas.id);
  const [revokeInvite] = useRevokeCanvasInviteMutation();

  const onChangeRole = async (memberId: string, role: MemberRole) => {
    await changeRole({ variables: { input: { memberId, role } } });
  };

  const onRemoveMember = async (memberId: string) => {
    await removeMember({ variables: { memberId } });
  };

  const onInvite = async (email: string, role: MemberRole) => {
    await sendInvite({ variables: { input: { resourceId: canvas.id, email, role } } });
  };

  const onRevokeInvite = async (inviteId: string) => {
    await revokeInvite({ variables: { inviteId } });
  };

  return {
    members,
    invites,
    onChangeRole,
    onRemoveMember,
    onInvite,
    onRevokeInvite
  };
}

export { useCanvasPermissionsModal };
