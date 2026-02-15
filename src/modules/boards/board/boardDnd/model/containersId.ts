import { CardContainer } from '@/common/api/graphql/__generated__';

const inboxContainerId = CardContainer.Inbox;
const columnContainerId = CardContainer.Column;
const getColumnContainerId = (columnId: string) => `${columnContainerId}:${columnId}`;

export { columnContainerId, getColumnContainerId, inboxContainerId };
