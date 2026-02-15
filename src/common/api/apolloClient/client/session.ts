import type {
  GetMeQuery,
  UpdateBoardInvitesMutation,
  UpdateBoardMutation,
  UpdateCanvasInvitesMutation,
  UpdateCanvasMutation
} from '@/common/api/graphql/__generated__';

import { GetMeDocument } from '@/common/api/graphql/__generated__';

import { apolloClient } from './apolloClient';

function revalidateGetMeQuery(data: GetMeQuery['me']) {
  apolloClient.writeQuery({
    query: GetMeDocument,
    data: { me: data }
  });
}

function forceLogout() {
  revalidateGetMeQuery(null);
}

function updateCanvasInCache(canvas: UpdateCanvasMutation['updateCanvas']) {
  if (!canvas) return;

  apolloClient.cache.modify({
    id: apolloClient.cache.identify({
      __typename: 'Canvas',
      id: canvas.id
    }),
    fields: {
      name: () => canvas.name,
      previewSrc: () => canvas.previewSrc
    }
  });
}

function updateCanvasInvitesInCache(payload: UpdateCanvasInvitesMutation['updateCanvasInvites']) {
  if (!payload) return;

  apolloClient.cache.modify({
    id: apolloClient.cache.identify({
      __typename: 'Canvas',
      id: payload.id
    }),
    fields: {
      invitedEmails: () => payload.invitedEmails
    }
  });
}

function removeCanvasFromCache(canvasId: string) {
  apolloClient.cache.modify({
    fields: {
      canvasList(existingRefs = [], { readField }) {
        return existingRefs.filter((ref: any) => readField('id', ref) !== canvasId);
      }
    }
  });

  apolloClient.cache.evict({
    id: apolloClient.cache.identify({
      __typename: 'Canvas',
      id: canvasId
    })
  });

  apolloClient.cache.gc();
}

function updateBoardInCache(board: UpdateBoardMutation['updateBoard']) {
  if (!board) return;

  apolloClient.cache.modify({
    id: apolloClient.cache.identify({
      __typename: 'Board',
      id: board.id
    }),
    fields: {
      name: () => board.name,
      previewSrc: () => board.previewSrc
    }
  });
}

function updateBoardInvitesInCache(payload: UpdateBoardInvitesMutation['updateBoardInvites']) {
  if (!payload) return;

  apolloClient.cache.modify({
    id: apolloClient.cache.identify({
      __typename: 'Board',
      id: payload.id
    }),
    fields: {
      invitedEmails: () => payload.invitedEmails
    }
  });
}

function removeBoardFromCache(boardId: string) {
  apolloClient.cache.modify({
    fields: {
      boardList(existingRefs = [], { readField }) {
        return existingRefs.filter((ref: any) => readField('id', ref) !== boardId);
      }
    }
  });

  apolloClient.cache.evict({
    id: apolloClient.cache.identify({
      __typename: 'Board',
      id: boardId
    })
  });

  apolloClient.cache.gc();
}

export {
  forceLogout,
  removeBoardFromCache,
  removeCanvasFromCache,
  revalidateGetMeQuery,
  updateBoardInCache,
  updateBoardInvitesInCache,
  updateCanvasInCache,
  updateCanvasInvitesInCache
};
