'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/common/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/common/ui/form';
import { Input } from '@/common/ui/input';

import type { CanvasNameInputValue } from '../model/canvasNameInputSchema';

import { canvasNameSchema } from '../model/canvasNameInputSchema';

interface CanvasNameInputProps {
  name: string;
  onChangeName: (name: string) => void;
}

function CanvasNameInput({ name, onChangeName }: CanvasNameInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const form = useForm<CanvasNameInputValue>({
    resolver: zodResolver(canvasNameSchema),
    defaultValues: { name },
    mode: 'onChange'
  });

  const {
    handleSubmit,
    formState: { isDirty, isSubmitting, isValid },
    reset
  } = form;

  const onSubmit = (data: CanvasNameInputValue) => {
    if (!isDirty) return;
    onChangeName(data.name);
  };

  const handleBlur = () => {
    setIsFocused(false);
    reset({ name });
  };

  useEffect(() => {
    reset({ name });
  }, [name, reset]);

  return (
    <Form {...form}>
      <form
        className='absolute top-(--header-height)   px-4 mb-4 flex items-center gap-2 border-b'
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormField
          render={({ field }) => (
            <FormItem className='z-50 flex gap-2 m-0'>
              <FormControl>
                <Input
                  {...field}
                  className='max-w-[200px] border-0 border-b bg-card dark:bg-card text-ellipsis'
                  disabled={isSubmitting}
                  onBlur={handleBlur}
                  onFocus={() => setIsFocused(true)}
                />
              </FormControl>
              {isFocused && (
                <Button
                  className='z-50 rounded-full'
                  disabled={isSubmitting || !isValid || !isDirty}
                  size='icon'
                  type='submit'
                >
                  <Check />
                </Button>
              )}
              <FormMessage />
            </FormItem>
          )}
          name='name'
          control={form.control}
        />
      </form>
    </Form>
  );
}

export { CanvasNameInput };
