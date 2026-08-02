import type { BoardEventsSubscription } from '@src/common/api/graphql/__generated__';

type BoardEventEnvelope = BoardEventsSubscription['boardEvents'];
type BoardEvent = BoardEventEnvelope['event'];
type BoardEventListener = (event: BoardEventEnvelope) => void;

const listenersByBoardId = new Map<string, Set<BoardEventListener>>();

function publishBoardEvent(boardId: string, event: BoardEventEnvelope) {
  const listeners = listenersByBoardId.get(boardId);
  if (!listeners) return;

  listeners.forEach((listener) => listener(event));
}

function subscribeBoardEvents(boardId: string, listener: BoardEventListener) {
  const listeners = listenersByBoardId.get(boardId) ?? new Set<BoardEventListener>();
  listeners.add(listener);
  listenersByBoardId.set(boardId, listeners);

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) listenersByBoardId.delete(boardId);
  };
}

export { publishBoardEvent, subscribeBoardEvents };
export type { BoardEvent, BoardEventEnvelope };
