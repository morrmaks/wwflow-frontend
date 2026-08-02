import { createCardOperation } from '../_model/operations/createCardOperation';
import { createColumnOperation } from '../_model/operations/createColumnOperation';
import { deleteCardOperation } from '../_model/operations/deleteCardOperation';
import { deleteColumnOperation } from '../_model/operations/deleteColumnOperation';
import { moveCardOperation } from '../_model/operations/moveCardOperation';
import { moveColumnOperation } from '../_model/operations/moveColumnOperation';
import { renameBoardOperation } from '../_model/operations/renameBoardOperation';
import { renameColumnOperation } from '../_model/operations/renameColumnOperation';
import { updateBoardBackgroundOperation } from '../_model/operations/updateBoardBackgroundOperation';
import { updateCardOperation } from '../_model/operations/updateCardOperation';
import { updateInboxBackgroundOperation } from '../_model/operations/updateInboxBackgroundOperation';
import { useBoardStoreApi } from './useBoardStoreApi';

function useBoardOperations() {
  const store = useBoardStoreApi();

  return {
    updateBoardBackgroundOperation: updateBoardBackgroundOperation(store),
    updateInboxBackgroundOperation: updateInboxBackgroundOperation(store),
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
