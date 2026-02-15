'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import type { CanvasCardFragment } from '@/common/api/graphql/__generated__';

import { Button } from '@/common/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/common/ui/form';
import { Input } from '@/common/ui/input';
import { ImageUploadInput, useImageUploadState } from '@/modules/media';

import type { EditCanvasFormValues } from '../model/editCanvasFormSchema';

import { useUpdateCanvasMutation } from '../hooks/useUpdateCanvasMutation';
import { editCanvasFormSchema } from '../model/editCanvasFormSchema';

interface EditCanvasFormProps {
  card: CanvasCardFragment;
}

function EditCanvasForm({ card }: EditCanvasFormProps) {
  const { image, setImage, removed, setRemoved } = useImageUploadState();

  const [updateCanvas, { loading }] = useUpdateCanvasMutation();

  const form = useForm<EditCanvasFormValues>({
    resolver: zodResolver(editCanvasFormSchema),
    defaultValues: { name: card.name },
    mode: 'onChange'
  });

  const onSubmit = async (values: EditCanvasFormValues) => {
    await updateCanvas({
      variables: {
        canvasId: card.id,
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
              <FormLabel>Canvas name</FormLabel>
              <FormControl>
                <Input placeholder='My canvas' {...field} />
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
          Edit canvas
        </Button>
      </form>
    </Form>
  );
}

export { EditCanvasForm };
