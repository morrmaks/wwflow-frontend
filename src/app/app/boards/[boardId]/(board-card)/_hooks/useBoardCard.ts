import type { CardContainer, CardPatchInput } from '@src/common/api/graphql/__generated__';

import { nanoid } from 'nanoid';
import { useRef, useState } from 'react';

import { useDeleteCardMutation, useUpdateCardMutation } from '../../(events)';
import { useBoardOperations } from '../../_hooks/useBoardOperations';
import { useBoardStore } from '../../_hooks/useBoardStore';
import { getBoardId, getCardById } from '../../_model/boardSelectors';
import { useSortableBoardCard } from './useSortableBoardCard';

function useBoardCard(cardId: string, container: CardContainer, index: number, columnId?: string) {
  const boardId = useBoardStore(getBoardId);
  const card = useBoardStore(getCardById(cardId));

  const { updateCardOperation } = useBoardOperations();

  const cardRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);

  const { deleteCardOperation } = useBoardOperations();
  const [deleteCard] = useDeleteCardMutation();
  const [updateCard] = useUpdateCardMutation();

  const openEditor = () => {
    const el = cardRef.current;
    if (!el) return;

    setAnchorRect(el.getBoundingClientRect());
    setIsEditing(true);
  };

  const closeEditor = () => {
    setIsEditing(false);
    setAnchorRect(null);
  };

  const handleDeleteCard = () => {
    const clientMutationId = nanoid();
    const deleteCardCtx = deleteCardOperation({
      clientMutationId,
      cardId,
      card,
      container,
      columnId,
      index
    });
    deleteCard({
      variables: { boardId, clientMutationId, cardId },
      context: deleteCardCtx
    });
    closeEditor();
  };

  const update = (patch: CardPatchInput, prevPatch: CardPatchInput) => {
    const clientMutationId = nanoid();
    const updateCardCtx = updateCardOperation({ clientMutationId, cardId, patch, prevPatch });
    updateCard({
      variables: { patch, boardId, clientMutationId, cardId },
      context: updateCardCtx
    });
  };

  const onCheckedChange = () => {
    update({ completed: !card.completed }, { completed: card.completed });
  };

  const sortable = useSortableBoardCard(boardId, container, index, cardId, columnId);

  return {
    card,
    cardRef,

    isEditing,
    anchorRect,

    update,
    openEditor,
    closeEditor,
    onCheckedChange,
    handleDeleteCard,
    sortable
  };
}

export { useBoardCard };
