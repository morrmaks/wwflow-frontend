'use client';

import type { CardContainer } from '@src/common/api/graphql/__generated__';

import { cn } from '@src/common/lib/utils';
import { Button } from '@src/common/ui/button';
import { Form, FormControl, FormField, FormItem } from '@src/common/ui/form';
import { Textarea } from '@src/common/ui/textarea';
import { PlusIcon } from 'lucide-react';

import { useCreateCard } from '../_hooks/useCreateCard';

type CreateCardVariant = 'block' | 'inline';

interface CreateCardProps {
  autoFocus?: boolean;
  buttonText?: string;
  className?: string;
  columnId?: string;
  container: CardContainer;
  index?: number;
  placeholder?: string;
  variant?: CreateCardVariant;
}

function CreateCard({
  index,
  buttonText,
  placeholder = 'Enter a title for this card…',
  autoFocus = true,
  container,
  columnId,
  variant = 'block',
  className
}: CreateCardProps) {
  const { open, form, submit, handleClose, handleOpen, onKeyDown } = useCreateCard(
    container,
    columnId,
    index
  );

  const isBlock = variant === 'block';

  if (!open && isBlock) {
    return (
      <Button
        className={cn(
          'justify-center py-2 h-auto w-full border font-semibold',
          'hover:bg-card hover:text-foreground text-muted-foreground bg-card dark:bg-card',
          className
        )}
        size='sm'
        variant='outline'
        onClick={handleOpen}
      >
        <PlusIcon />
        {buttonText}
      </Button>
    );
  }

  if (!open && !isBlock) {
    return (
      <div className='relative h-2 group'>
        <Button
          className={cn(
            'absolute inset-0 dark:hover:bg-transparent hover:bg-transparent',
            className
          )}
          size='sm'
          variant='ghost'
          onClick={handleOpen}
        ></Button>
        <div
          className='
          absolute inset-x-0 top-1/2 -translate-y-1/2
          opacity-0 group-hover:opacity-100 transition-opacity
          flex items-center justify-center
          pointer-events-none w-full gap-1 z-110 px-1
        '
        >
          <div className='border border-accent-foreground/40 dark:border-accent-foreground/50 border-dashed flex-1' />
          <div className='rounded-md bg-card p-1 border'>
            <PlusIcon className='h-4 w-4' />
          </div>
          <div className='border border-accent-foreground/40 dark:border-accent-foreground/50 border-dashed flex-1' />
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form className={cn('flex flex-col gap-1', !isBlock && 'my-2')} onSubmit={submit}>
        <FormField
          render={({ field }) => (
            <FormItem className='mb-1'>
              <FormControl>
                <Textarea
                  {...field}
                  className='resize-none text-sm bg-card dark:bg-card'
                  autoFocus={autoFocus}
                  onKeyDown={onKeyDown}
                  placeholder={placeholder}
                  rows={3}
                />
              </FormControl>
            </FormItem>
          )}
          name='title'
          control={form.control}
        />

        <div className='flex gap-2'>
          <Button size='sm' type='submit'>
            Save
          </Button>
          <Button size='sm' variant='ghost' onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}

export { CreateCard };
