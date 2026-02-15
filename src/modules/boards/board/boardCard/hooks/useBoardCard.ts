import { useRef, useState } from 'react';

import type { CardContainer, CardPatchInput } from '@/common/api/graphql/__generated__';

import { useDeleteCardMutation, useUpdateCardMutation } from '../../boardEvents';
import { useBoardOperations } from '../../hooks/useBoardOperations';
import { useBoardStore } from '../../hooks/useBoardStore';
import { getBoardId, getCardById } from '../../model/boardSelectors';
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
    const deleteCardCtx = deleteCardOperation({ cardId, card, container, columnId, index });
    deleteCard({ variables: { boardId, cardId }, context: deleteCardCtx });
    closeEditor();
  };

  const update = (patch: CardPatchInput, prevPatch: CardPatchInput) => {
    const updateCardCtx = updateCardOperation({ cardId, patch, prevPatch });
    updateCard({ variables: { patch, boardId, cardId }, context: updateCardCtx });
  };

  const onCheckedChange = () => {
    update({ completed: !card.completed }, { completed: card.completed });
  };

  const sortable = useSortableBoardCard(container, index, cardId, columnId);

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
