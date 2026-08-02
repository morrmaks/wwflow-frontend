'use client';

import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';

import { DndContext, DragOverlay } from '@dnd-kit/core';
import { useState } from 'react';
import { createPortal } from 'react-dom';

import type { BoardDragData } from '../_model/dragTypes';

import { useBoardDnd } from '../_hooks/useBoardDnd';
import { isBoardDragData } from '../_lib/guards';
import { BoardCardDragOverlay } from './boardCardDragOverlay';
import { BoardColumnDragOverlay } from './boardColumnDragOverlay';

interface BoardDndProviderProps {
  children: React.ReactNode;
}

function BoardDndProvider({ children }: BoardDndProviderProps) {
  const { sensors, onDragEnd, onDragStart } = useBoardDnd();

  const [activeItem, setActiveItem] = useState<BoardDragData | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const data = event.active.data.current;
    if (isBoardDragData(data)) setActiveItem(data);
    onDragStart(event);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveItem(null);
    onDragEnd(event);
  };

  return (
    <DndContext
      autoScroll={false}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      sensors={sensors}
    >
      {children}

      {createPortal(
        <DragOverlay dropAnimation={null}>
          {activeItem?.type === 'card' && <BoardCardDragOverlay data={activeItem} />}
          {activeItem?.type === 'column' && <BoardColumnDragOverlay data={activeItem} />}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}

export { BoardDndProvider };
