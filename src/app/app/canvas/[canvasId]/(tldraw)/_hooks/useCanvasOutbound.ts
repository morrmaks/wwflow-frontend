import { useCallback } from 'react';

import { useRenameCanvasMutation } from './useRenameCanvasMutation';
import { useSendCanvasDiffMutation } from './useSendCanvasDiffMutation';

export function useCanvasOutbound(canvasId: string, enabled: boolean) {
  const [sendDiffMutation] = useSendCanvasDiffMutation();
  const [updateTitleMutation] = useRenameCanvasMutation();

  const sendDiff = useCallback(
    (diff: unknown) => {
      if (!enabled) return;
      sendDiffMutation({ variables: { canvasId, diff } });
    },
    [canvasId, enabled]
  );

  const updateName = useCallback(
    (name: string) => {
      if (!enabled) return;
      updateTitleMutation({ variables: { canvasId, name } });
    },
    [canvasId, enabled]
  );

  return { sendDiff, updateName };
}
