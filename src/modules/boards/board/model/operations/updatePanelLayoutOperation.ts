import type { BoardStoreState, PanelLayoutModel } from '../boardStoreState';

import { createOperation } from './createOperation';

interface UpdatePanelLayoutInput {
  panelLayout: PanelLayoutModel;
}

const updatePanelLayoutOptimistic =
  (input: UpdatePanelLayoutInput) => (state: BoardStoreState) => ({
    ...state,
    panelLayout: input.panelLayout
  });

const updatePanelLayoutOperation = createOperation(
  'PanelLayoutChanged',
  updatePanelLayoutOptimistic
);

export { updatePanelLayoutOperation };
