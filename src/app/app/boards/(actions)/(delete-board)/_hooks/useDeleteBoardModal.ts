import type { BoardListFieldsFragment } from '@src/common/api/graphql/__generated__';

import { useDeleteBoardMutation } from './useDeleteBoardMutation';

function useDeleteBoardModal(board: BoardListFieldsFragment) {
  const [deleteBoard] = useDeleteBoardMutation();

  const handleDelete = async () => {
    await deleteBoard({ variables: { boardId: board.id } });
  };

  return {
    handleDelete
  };
}

export { useDeleteBoardModal };
