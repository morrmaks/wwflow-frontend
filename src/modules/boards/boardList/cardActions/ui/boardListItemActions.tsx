'use client';

import { useState } from 'react';

import type { BoardListItemFragment } from '@/common/api/graphql/__generated__';

import { ROUTES } from '@/common/constants/routes';
import { getAppUrl } from '@/common/lib/url';

import type { BoardActionHandlers, BoardActionKey } from '../model/boardDialogsConfig';

import { BoardListItemHoverMenu } from '../../listItemHoverMenu';
import { boardDialogsConfig } from '../model/boardDialogsConfig';

interface BoardListItemActionsProps {
  card: BoardListItemFragment;
}

function BoardListItemActions({ card }: BoardListItemActionsProps) {
  const [modal, setModal] = useState<BoardActionKey | null>(null);
  const url = getAppUrl(ROUTES.appCanvasId(card.id));

  const handlers: BoardActionHandlers = {
    edit: () => setModal('edit'),
    invite: () => setModal('invite'),
    delete: () => setModal('delete')
  };

  const onOpenChange = (open: boolean) => {
    if (!open) setModal(null);
  };

  const ActiveDialog = boardDialogsConfig.find((d) => d.action === modal);

  return (
    <>
      <BoardListItemHoverMenu canvasUrl={url} handlers={handlers} />

      {ActiveDialog && <ActiveDialog.dialog card={card} onOpenChange={onOpenChange} />}
    </>
  );
}

export { BoardListItemActions };
