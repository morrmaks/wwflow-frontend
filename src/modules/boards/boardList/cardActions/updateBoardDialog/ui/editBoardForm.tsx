'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import type { BoardCardFragment } from '@/common/api/graphql/__generated__';

import { Button } from '@/common/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/common/ui/form';
import { Input } from '@/common/ui/input';
import { ImageUploadInput, useImageUploadState } from '@/modules/media';

import type { EditBoardFormValues } from '../model/editBoardFormSchema';

import { useUpdateBoardMutation } from '../hooks/useUpdateBoardMutation';
import { editBoardFormSchema } from '../model/editBoardFormSchema';

interface EditBoardFormProps {
  card: BoardCardFragment;
}

function EditBoardForm({ card }: EditBoardFormProps) {
  const { image, setImage, removed, setRemoved } = useImageUploadState();

  const [updateBoard, { loading }] = useUpdateBoardMutation();

  const form = useForm<EditBoardFormValues>({
    resolver: zodResolver(editBoardFormSchema),
    defaultValues: { name: card.name },
    mode: 'onChange'
  });

  const onSubmit = async (values: EditBoardFormValues) => {
    await updateBoard({
      variables: {
        boardId: card.id,
        name: values.name,
        previewImage: image,
        removePreview: removed
      }
    });
  };

  return (
    <Form {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
        <ImageUploadInput
          imageFile={image}
          preview={card.previewSrc}
          setImageFile={setImage}
          removed={removed}
          setRemoved={setRemoved}
        />
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>Board name</FormLabel>
              <FormControl>
                <Input placeholder='My board' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name='name'
          control={form.control}
        />

        <Button
          className='w-full mt-4'
          disabled={loading || form.formState.isSubmitting || !form.formState.isValid}
          size='lg'
          type='submit'
        >
          Edit board
        </Button>
      </form>
    </Form>
  );
}

export { EditBoardForm };
