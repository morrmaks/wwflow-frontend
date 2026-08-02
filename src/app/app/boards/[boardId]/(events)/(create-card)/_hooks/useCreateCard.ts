import { CardContainer } from '@src/common/api/graphql/__generated__';
import { nanoid } from 'nanoid';
import { useForm } from 'react-hook-form';

import type { CreateCardFormValues } from '../_model/createCardSchema';

import { useBoardOperations } from '../../../_hooks/useBoardOperations';
import { useBoardStore } from '../../../_hooks/useBoardStore';
import { getBoardId, getCardsByColumnId, getInboxCardIds } from '../../../_model/boardSelectors';
import { useCreateCardMutation } from '../../_hooks/useCreateCardMutation';
import { useCreateCardUI } from './useCreateCardUI';

function useCreateCard(container: CardContainer, columnId?: string, index?: number) {
  const { target, open, close } = useCreateCardUI();

  const boardId = useBoardStore(getBoardId);
  const inboxCardIds = useBoardStore(getInboxCardIds);
  const columnCardIds = columnId ? useBoardStore(getCardsByColumnId(columnId)) : [];

  const { createCardOperation } = useBoardOperations();
  const [createCard] = useCreateCardMutation();

  const form = useForm<CreateCardFormValues>({ defaultValues: { title: '' } });

  const handleClose = () => {
    close();
    form.reset();
  };

  const handleOpen = () => open({ container, columnId, index });

  const create = (title: string) => {
    const clientMutationId = nanoid();
    const clientId = nanoid();
    const targetCardIds = container === CardContainer.Inbox ? inboxCardIds : columnCardIds;
    const resolvedColumnId = container === CardContainer.Column ? columnId : null;
    const resolvedIndex = index ?? targetCardIds.length;

    const createCardCtx = createCardOperation({
      clientMutationId,
      clientId,
      title,
      container,
      columnId: resolvedColumnId,
      index: resolvedIndex
    });

    createCard({
      variables: {
        boardId,
        clientMutationId,
        clientId,
        title,
        container,
        columnId: resolvedColumnId,
        index: resolvedIndex
      },
      context: createCardCtx
    });
  };

  const submit = form.handleSubmit(({ title }) => {
    const next = title.trim();
    if (!next) return;

    create(next);
    handleClose();
  });

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      handleClose();
    }
  };

  const isOpen =
    target?.container === container && target?.columnId === columnId && target?.index === index;

  return { open: isOpen, form, submit, handleClose, handleOpen, onKeyDown };
}

export { useCreateCard };
