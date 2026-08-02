import type {
  CreateCardMutationVariables,
  CreateColumnMutationVariables,
  DeleteCardMutationVariables,
  DeleteColumnMutationVariables,
  MoveCardMutationVariables,
  MoveColumnMutationVariables,
  RenameBoardMutationVariables,
  RenameColumnMutationVariables,
  UpdateBoardBackgroundMutationVariables,
  UpdateCardMutationVariables,
  UpdateInboxBackgroundMutationVariables
} from '@src/common/api/graphql/__generated__';
import type { GraphQLRequestConfig } from 'mock-config-server';

import { BoardRealtimeCommand } from '@mock/modules';
import { createGraphQLErrorResponse } from '@mock/shared';
import { requireAuth } from '@mock/transport/auth';
import { graphqlData, type GraphQLRouteParams } from '@mock/transport/graphql/types';
import { setAuthCookies } from '@mock/transport/http';

type RealtimeVariables =
  | CreateCardMutationVariables
  | CreateColumnMutationVariables
  | DeleteCardMutationVariables
  | DeleteColumnMutationVariables
  | MoveCardMutationVariables
  | MoveColumnMutationVariables
  | RenameBoardMutationVariables
  | RenameColumnMutationVariables
  | UpdateBoardBackgroundMutationVariables
  | UpdateCardMutationVariables
  | UpdateInboxBackgroundMutationVariables;

function createRealtimeMutation<Variables extends RealtimeVariables>(
  identifier: string,
  fieldName: string,
  handler: (
    params: GraphQLRouteParams<Variables>
  ) => ReturnType<typeof BoardRealtimeCommand.renameBoard>
): GraphQLRequestConfig {
  return {
    operationType: 'mutation',
    identifier,
    interceptors: {
      response: (_data, params) => {
        if (_data.errors && _data.errors.length > 0) params.setStatusCode(400);
        else setAuthCookies(params);
        
        return _data;
      }
    },
    routes: [
      {
        data: graphqlData<Variables>((params) => {
          const error = requireAuth(params.request);
          if (error) return error;

          const result = handler(params);

          if (result.success) {
            return {
              data: {
                [fieldName]: result.data
              }
            };
          }

          return createGraphQLErrorResponse(result.error);
        })
      }
    ]
  };
}

const renameBoard = createRealtimeMutation<RenameBoardMutationVariables>(
  'RenameBoard',
  'renameBoard',
  ({ request }) =>
    BoardRealtimeCommand.renameBoard(
      request.body.variables.boardId,
      request.body.variables.clientMutationId,
      request.body.variables.title,
      request.user?.id || '',
      request.context.orm
    )
);

const updateBoardBackground = createRealtimeMutation<UpdateBoardBackgroundMutationVariables>(
  'UpdateBoardBackground',
  'updateBoardBackground',
  ({ request }) =>
    BoardRealtimeCommand.updateBoardBackground(
      request.body.variables.boardId,
      request.body.variables.clientMutationId,
      request.body.variables.background,
      request.user?.id || '',
      request.context.orm
    )
);

const updateInboxBackground = createRealtimeMutation<UpdateInboxBackgroundMutationVariables>(
  'UpdateInboxBackground',
  'updateInboxBackground',
  ({ request }) =>
    BoardRealtimeCommand.updateInboxBackground(
      request.body.variables.boardId,
      request.body.variables.clientMutationId,
      request.body.variables.background,
      request.user?.id || '',
      request.context.orm
    )
);

const createColumn = createRealtimeMutation<CreateColumnMutationVariables>(
  'CreateColumn',
  'createColumn',
  ({ request }) =>
    BoardRealtimeCommand.createColumn(
      request.body.variables.boardId,
      request.body.variables.clientMutationId,
      request.body.variables.clientId,
      request.body.variables.title,
      request.body.variables.index,
      request.user?.id || '',
      request.context.orm
    )
);

const moveColumn = createRealtimeMutation<MoveColumnMutationVariables>(
  'MoveColumn',
  'moveColumn',
  ({ request }) =>
    BoardRealtimeCommand.moveColumn(
      request.body.variables.boardId,
      request.body.variables.clientMutationId,
      request.body.variables.columnId,
      request.body.variables.toIndex,
      request.user?.id || '',
      request.context.orm
    )
);

const renameColumn = createRealtimeMutation<RenameColumnMutationVariables>(
  'RenameColumn',
  'renameColumn',
  ({ request }) =>
    BoardRealtimeCommand.renameColumn(
      request.body.variables.boardId,
      request.body.variables.clientMutationId,
      request.body.variables.columnId,
      request.body.variables.title,
      request.user?.id || '',
      request.context.orm
    )
);

const deleteColumn = createRealtimeMutation<DeleteColumnMutationVariables>(
  'DeleteColumn',
  'deleteColumn',
  ({ request }) =>
    BoardRealtimeCommand.deleteColumn(
      request.body.variables.boardId,
      request.body.variables.clientMutationId,
      request.body.variables.columnId,
      request.user?.id || '',
      request.context.orm
    )
);

const createCard = createRealtimeMutation<CreateCardMutationVariables>(
  'CreateCard',
  'createCard',
  ({ request }) =>
    BoardRealtimeCommand.createCard(
      request.body.variables.boardId,
      request.body.variables.clientMutationId,
      request.body.variables.clientId,
      request.body.variables.title,
      request.body.variables.container,
      request.body.variables.columnId,
      request.body.variables.index,
      request.user?.id || '',
      request.context.orm
    )
);

const moveCard = createRealtimeMutation<MoveCardMutationVariables>(
  'MoveCard',
  'moveCard',
  ({ request }) =>
    BoardRealtimeCommand.moveCard(
      request.body.variables.boardId,
      request.body.variables.clientMutationId,
      request.body.variables.cardId,
      request.body.variables.to,
      request.user?.id || '',
      request.context.orm
    )
);

const updateCard = createRealtimeMutation<UpdateCardMutationVariables>(
  'UpdateCard',
  'updateCard',
  ({ request }) =>
    BoardRealtimeCommand.updateCard(
      request.body.variables.boardId,
      request.body.variables.clientMutationId,
      request.body.variables.cardId,
      request.body.variables.patch,
      request.user?.id || '',
      request.context.orm
    )
);

const deleteCard = createRealtimeMutation<DeleteCardMutationVariables>(
  'DeleteCard',
  'deleteCard',
  ({ request }) =>
    BoardRealtimeCommand.deleteCard(
      request.body.variables.boardId,
      request.body.variables.clientMutationId,
      request.body.variables.cardId,
      request.user?.id || '',
      request.context.orm
    )
);

export {
  createCard,
  createColumn,
  deleteCard,
  deleteColumn,
  moveCard,
  moveColumn,
  renameBoard,
  renameColumn,
  updateBoardBackground,
  updateCard,
  updateInboxBackground
};
