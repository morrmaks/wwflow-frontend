import type { BoardListFieldsFragment, MemberRole } from '@src/common/api/graphql/__generated__';

import { useBoardPermissionsQuery } from './useBoardPermissionsQuery';
import { useChangeBoardMemberRoleMutation } from './useChangeBoardMemberRoleMutation';
import { useInviteBoardUserMutation } from './useInviteBoardUserMutation';
import { useRemoveBoardMemberMutation } from './useRemoveBoardMemberMutation';
import { useRevokeBoardInviteMutation } from './useRevokeBoardInviteMutation';

function useBoardPermissionsModal(board: BoardListFieldsFragment) {
  const { data } = useBoardPermissionsQuery(board.id);

  const members = data?.boardPermissions?.members || [];
  const invites = data?.boardPermissions?.invites || [];

  const [changeRole] = useChangeBoardMemberRoleMutation();
  const [removeMember] = useRemoveBoardMemberMutation();
  const [sendInvite] = useInviteBoardUserMutation(board.id);
  const [revokeInvite] = useRevokeBoardInviteMutation();

  const onChangeRole = async (memberId: string, role: MemberRole) => {
    await changeRole({ variables: { input: { memberId, role } } });
  };

  const onRemoveMember = async (memberId: string) => {
    await removeMember({ variables: { memberId } });
  };

  const onInvite = async (email: string, role: MemberRole) => {
    await sendInvite({ variables: { input: { resourceId: board.id, email, role } } });
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

export { useBoardPermissionsModal };
