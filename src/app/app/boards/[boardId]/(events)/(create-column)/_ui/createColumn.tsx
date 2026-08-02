'use client';

import { cn } from '@src/common/lib/utils';
import { Button } from '@src/common/ui/button';
import { Form, FormControl, FormField, FormItem } from '@src/common/ui/form';
import { Input } from '@src/common/ui/input';
import { PlusIcon } from 'lucide-react';

import { useCreateColumn } from '../_hooks/useCreateColumn';

function CreateColumn() {
  const { open, form, submit, handleClose, handleOpen, onKeyDown } = useCreateColumn();

  if (!open) {
    return (
      <Button
        className={cn(
          'justify-center py-2 min-w-64 max-h-10 h-auto font-semibold',
          'bg-background/20 text-secondary-foreground hover:bg-background/40 hover:text-secondary-foreground dark:bg-background/20 dark:text-secondary-foreground dark:hover:bg-background/40 dark:hover:text-secondary-foreground'
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
