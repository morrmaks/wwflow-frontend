import {
  createCardOperation,
  createColumnOperation,
  deleteCardOperation,
  deleteColumnOperation,
  moveCardOperation,
  moveColumnOperation,
  renameBoardOperation,
  renameColumnOperation,
  updateBoardBackgroundOperation,
  updateCardOperation,
  updateInboxBackgroundOperation,
  updatePanelLayoutOperation
} from '../model';
import { useBoardStoreApi } from './useBoardStoreApi';

function useBoardOperations() {
  const store = useBoardStoreApi();

  return {
    updateBoardBackgroundOperation: updateBoardBackgroundOperation(store),
    updateInboxBackgroundOperation: updateInboxBackgroundOperation(store),
    updatePanelLayoutOperation: updatePanelLayoutOperation(store),
    moveCardOperation: moveCardOperation(store),
    moveColumnOperation: moveColumnOperation(store),
    createCardOperation: createCardOperation(store),
    createColumnOperation: createColumnOperation(store),
    renameBoardOperation: renameBoardOperation(store),
    renameColumnOperation: renameColumnOperation(store),
    updateCardOperation: updateCardOperation(store),
    deleteColumnOperation: deleteColumnOperation(store),
    deleteCardOperation: deleteCardOperation(store)
  };
}

export { useBoardOperations };
