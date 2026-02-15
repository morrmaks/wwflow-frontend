'use client';

import { Pencil } from 'lucide-react';

import type { CardContainer } from '@/common/api/graphql/__generated__';

import { cn } from '@/common/lib/utils';
import { Button } from '@/common/ui/button';
import { Card } from '@/common/ui/card';
import { Checkbox } from '@/common/ui/checkbox';

import { useBoardCard } from '../hooks/useBoardCard';
import { BoardCardEditor } from './boardCardEditor';

interface BoardCardProps {
  cardId: string;
  columnId?: string;
  container: CardContainer;
  index: number;
}

function BoardCard({ cardId, container, columnId, index }: BoardCardProps) {
  const {
    card,
    cardRef,
    isEditing,
    anchorRect,
    openEditor,
    closeEditor,
    onCheckedChange,
    update,
    handleDeleteCard,
    sortable
  } = useBoardCard(cardId, container, index, columnId);
  const { title, completed } = card;
  const { setNodeRef, style, isDragging, attributes, listeners } = sortable;

  return (
    <div
      ref={setNodeRef}
      className={cn(isDragging && 'opacity-20')}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Card ref={cardRef} className='group relative rounded-lg px-3 py-2 text-sm'>
        {isDragging && <div className='absolute inset-0 rounded-lg bg-chart-2 z-10' />}
        <div
          className={cn(
            'absolute left-2 top-2 transition-all mt-0.5',
            completed ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          )}
        >
          <Checkbox
            checked={completed}
            className='rounded-full data-[state=checked]:bg-chart-2 dark:data-[state=checked]:bg-chart-2 data-[state=checked]:border-chart-2 dark:data-[state=checked]:border-chart-2'
            onCheckedChange={onCheckedChange}
          />
        </div>

        <p
          className={cn(
            'transition-all group-hover:pr-6',
            'whitespace-pre-wrap wrap-break-word',
            completed ? 'pl-5' : 'pl-0 pr-0 group-hover:pl-5',
            completed && 'text-muted-foreground'
          )}
        >
          {title}
        </p>

        <Button
          className={cn(
            'absolute right-2 top-2 opacity-0 group-hover:opacity-100',
            'transition-all text-muted-foreground hover:text-foreground hover:bg-transparent dark:hover:bg-transparent',
            'w-5 h-5 p-0'
          )}
          variant='ghost'
          onClick={openEditor}
        >
          <Pencil className='h-4 w-4' />
        </Button>
        {isEditing && anchorRect && (
          <BoardCardEditor
            handleDeleteCard={handleDeleteCard}
            title={title}
            update={update}
            anchorRect={anchorRect}
            onClose={closeEditor}
          />
        )}
      </Card>
    </div>
  );
}

export { BoardCard };
