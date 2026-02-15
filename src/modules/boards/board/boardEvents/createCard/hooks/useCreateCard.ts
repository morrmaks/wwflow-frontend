import { nanoid } from 'nanoid';
import { useForm } from 'react-hook-form';

import { CardContainer } from '@/common/api/graphql/__generated__';

import type { CreateCardFormValues } from '../model/createCardSchema';

import { useBoardOperations } from '../../../hooks/useBoardOperations';
import { useBoardStore } from '../../../hooks/useBoardStore';
import { getBoardId, getCardsByColumnId } from '../../../model/boardSelectors';
import { useCreateCardMutation } from '../../hooks';
import { useCreateCardUI } from './useCreateCardUI';

function useCreateCard(container: CardContainer, columnId?: string, index?: number) {
  const { target, open, close } = useCreateCardUI();

  const boardId = useBoardStore(getBoardId);
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
    const clientId = nanoid();
    const resolvedIndex = index ?? (container === CardContainer.Column ? columnCardIds.length : 0);

    const createCardCtx = createCardOperation({
      clientId,
      title,
      container,
      columnId,
      index: resolvedIndex
    });

    createCard({
      variables: {
        boardId,
        clientId,
        title,
        container,
        columnId,
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
