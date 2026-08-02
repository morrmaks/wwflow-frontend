import type { BoardListFieldsFragment } from '@src/common/api/graphql/__generated__';

import { useRemoveBoardMemberMutation } from '../../(permissions)';

function useLeaveBoardModal(board: BoardListFieldsFragment) {
  const [removeMember] = useRemoveBoardMemberMutation();

  const handleLeave = async () => {
    await removeMember({ variables: { memberId: board.myMemberId } });
  };

  return {
    handleLeave
  };
}

export { useLeaveBoardModal };
