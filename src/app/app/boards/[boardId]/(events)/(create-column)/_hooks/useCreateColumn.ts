import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import type { CreateColumnFormValues } from '../_model/createColumnSchema';

import { useBoardOperations } from '../../../_hooks/useBoardOperations';
import { useBoardStore } from '../../../_hooks/useBoardStore';
import { getBoardId, getColumns } from '../../../_model/boardSelectors';
import { useCreateColumnMutation } from '../../_hooks/useCreateColumnMutation';

function useCreateColumn() {
  const [open, setOpen] = useState<boolean>(false);

  const boardId = useBoardStore(getBoardId);
  const columns = useBoardStore(getColumns);

  const { createColumnOperation } = useBoardOperations();
  const [createColumn] = useCreateColumnMutation();

  const form = useForm<CreateColumnFormValues>({ defaultValues: { title: '' } });

  const handleClose = () => {
    setOpen(false);
    form.reset();
  };

  const handleOpen = () => setOpen(true);

  const create = (title: string) => {
    const clientMutationId = nanoid();
    const clientId = nanoid();
    const index = columns.length;

    const createColumnCtx = createColumnOperation(
      {
        clientMutationId,
        clientId,
        title,
        index
      },
      100
    );

    createColumn({
      variables: {
        boardId,
        clientMutationId,
        clientId,
        title,
        index
      },
      context: createColumnCtx
    });
  };

  const submit = form.handleSubmit(({ title }) => {
    const next = title.trim();
    if (!next) return;

    create(next);
    handleClose();
  });

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      handleClose();
    }
  };

  return { open, form, submit, handleClose, handleOpen, onKeyDown };
}

export { useCreateColumn };
