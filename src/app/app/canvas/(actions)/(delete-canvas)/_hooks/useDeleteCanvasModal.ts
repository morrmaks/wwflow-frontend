import type { CanvasListFieldsFragment } from '@src/common/api/graphql/__generated__';

import { useDeleteCanvasMutation } from './useDeleteCanvasMutation';

function useDeleteCanvasModal(canvas: CanvasListFieldsFragment) {
  const [deleteCanvas] = useDeleteCanvasMutation();

  const handleDelete = async () => {
    await deleteCanvas({ variables: { canvasId: canvas.id } });
  };

  return {
    handleDelete
  };
}

export { useDeleteCanvasModal };
