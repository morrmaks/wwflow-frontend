import type { CanvasListFieldsFragment } from '@src/common/api/graphql/__generated__';

import { useRemoveCanvasMemberMutation } from '../../(permissions)';

function useLeaveCanvasModal(canvas: CanvasListFieldsFragment) {
  const [removeMember] = useRemoveCanvasMemberMutation();

  const handleLeave = async () => {
    await removeMember({ variables: { memberId: canvas.myMemberId } });
  };

  return {
    handleLeave
  };
}

export { useLeaveCanvasModal };
