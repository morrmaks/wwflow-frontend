import { useBoardEventsSubscription } from '../_hooks/useBoardEventsSubscription';

function BoardEvents({ boardId }: { boardId: string }) {
  useBoardEventsSubscription(boardId);
  return null;
}

export { BoardEvents };
