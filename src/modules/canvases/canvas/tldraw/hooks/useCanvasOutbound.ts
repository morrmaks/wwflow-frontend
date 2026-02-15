import { useCallback } from 'react';

import { useRenameCanvasMutation } from './useRenameCanvasMutation';
import { useSendCanvasDiffMutation } from './useSendCanvasDiffMutation';

export function useCanvasOutbound(id: string, enabled: boolean) {
  const [sendDiffMutation] = useSendCanvasDiffMutation();
  const [updateTitleMutation] = useRenameCanvasMutation();

  const sendDiff = useCallback(
    (diff: unknown) => {
      if (!enabled) return;
      sendDiffMutation({ variables: { canvasId: id, diff } });
    },
    [id, enabled]
  );

  const updateName = useCallback(
    (name: string) => {
      if (!enabled) return;
      updateTitleMutation({ variables: { canvasId: id, name } });
    },
    [id, enabled]
  );

  return { sendDiff, updateName };
}
