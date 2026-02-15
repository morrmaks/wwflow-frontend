'use client';

import { useState } from 'react';

import type { CanvasCardFragment } from '@/common/api/graphql/__generated__';

import { ROUTES } from '@/common/constants/routes';
import { getAppUrl } from '@/common/lib/url';

import type { CanvasActionHandlers, CanvasActionKey } from '../model/canvasDialogsConfig';

import { CanvasCardHoverMenu } from '../../cardHoverMenu';
import { canvasDialogsConfig } from '../model/canvasDialogsConfig';

interface CanvasCardActionsProps {
  card: CanvasCardFragment;
}

function CanvasCardActions({ card }: CanvasCardActionsProps) {
  const [modal, setModal] = useState<CanvasActionKey | null>(null);
  const url = getAppUrl(ROUTES.appCanvasId(card.id));

  const handlers: CanvasActionHandlers = {
    edit: () => setModal('edit'),
    invite: () => setModal('invite'),
    delete: () => setModal('delete')
  };

  const onOpenChange = (open: boolean) => {
    if (!open) setModal(null);
  };

  const ActiveDialog = canvasDialogsConfig.find((d) => d.action === modal);

  return (
    <>
      <CanvasCardHoverMenu canvasUrl={url} handlers={handlers} />

      {ActiveDialog && <ActiveDialog.dialog card={card} onOpenChange={onOpenChange} />}
    </>
  );
}

export { CanvasCardActions };
