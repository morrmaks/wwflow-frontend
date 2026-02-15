'use client';

import { PlusIcon } from 'lucide-react';

import { cn } from '@/common/lib/utils';
import { Button } from '@/common/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/common/ui/form';
import { Input } from '@/common/ui/input';

import { useCreateColumn } from '../hooks/useCreateColumn';

function CreateColumn() {
  const { open, form, submit, handleClose, handleOpen, onKeyDown } = useCreateColumn();

  if (!open) {
    return (
      <Button
        className={cn(
          'justify-center py-2 min-w-64 max-h-10 h-auto font-semibold',
          'hover:bg-background/40 hover:text-accent dark:hover:text-accent-foreground dark:hover:bg-background/40',
          'text-accent dark:text-accent-foreground bg-background/20 dark:bg-background/20'
        )}
        size='sm'
        variant='secondary'
        onClick={handleOpen}
      >
        <PlusIcon />
        Add another column
      </Button>
    );
  }

  return (
    <Form {...form}>
      <form className='flex flex-col gap-1' onSubmit={submit}>
        <FormField
          render={({ field }) => (
            <FormItem className='mb-1'>
              <FormControl>
                <Input
                  {...field}
                  className='min-w-64 text-sm bg-card dark:bg-card'
                  autoFocus
                  onKeyDown={onKeyDown}
                  placeholder={'Enter the column name...'}
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

export { CreateColumn };
