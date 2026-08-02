import type { AppOrm } from '@mock/infra/orm';

function createDefaultBoardStructure(orm: AppOrm, bId: number, now: string) {
  const inbox = orm.columns.create({
    boardId: bId,
    clientId: null,
    clientIdExpiresAt: null,
    title: 'Inbox',
    position: 0,
    isInbox: true,
    createdAt: now,
    updatedAt: now
  });

  const todo = orm.columns.create({
    boardId: bId,
    clientId: null,
    clientIdExpiresAt: null,
    title: 'To Do',
    position: 1000,
    isInbox: false,
    createdAt: now,
    updatedAt: now
  });

  const inProgress = orm.columns.create({
    boardId: bId,
    clientId: null,
    clientIdExpiresAt: null,
    title: 'In Progress',
    position: 2000,
    isInbox: false,
    createdAt: now,
    updatedAt: now
  });

  const done = orm.columns.create({
    boardId: bId,
    clientId: null,
    clientIdExpiresAt: null,
    title: 'Done',
    position: 3000,
    isInbox: false,
    createdAt: now,
    updatedAt: now
  });

  const seedCards = [
    { title: 'Welcome to WWFlow', columnId: inbox.id, position: 1000 },
    { title: 'Drag me around', columnId: inbox.id, position: 2000 },

    { title: 'Setup project', columnId: todo.id, position: 1000 },
    { title: 'Define architecture', columnId: todo.id, position: 2000 },

    { title: 'Build optimistic engine', columnId: inProgress.id, position: 1000 },

    { title: 'Celebrate launch', columnId: done.id, position: 1000 }
  ];

  seedCards.forEach((card) =>
    orm.cards.create({
      columnId: card.columnId,
      clientId: null,
      clientIdExpiresAt: null,
      title: card.title,
      completed: false,
      position: card.position,
      createdAt: now,
      updatedAt: now
    })
  );
}

export { createDefaultBoardStructure };
