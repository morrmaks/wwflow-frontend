'use client';

import type { CanvasListFieldsFragment } from '@src/common/api/graphql/__generated__';

import { ImageUploadInput } from '@src/app/app/(media)';
import { Button } from '@src/common/ui/button';
import { DialogClose } from '@src/common/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@src/common/ui/form';
import { Input } from '@src/common/ui/input';

import { useEditCanvasForm } from '../_hooks/useEditCanvasForm';

interface EditCanvasFormProps {
  canvas: CanvasListFieldsFragment;
}

function EditCanvasForm({ canvas }: EditCanvasFormProps) {
  const { form, onSubmit, loading, image, setImage, setRemoved, removed } =
    useEditCanvasForm(canvas);

  return (
    <Form {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
        <ImageUploadInput
          imageFile={image}
          preview={canvas.previewUrl}
          setImageFile={setImage}
          removed={removed}
          setRemoved={setRemoved}
        />
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>Canvas name</FormLabel>
              <FormControl>
                <Input autoFocus={false} placeholder='My canvas' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name='title'
          control={form.control}
        />

        <DialogClose asChild>
          <Button
            className='w-full mt-4'
            disabled={loading || form.formState.isSubmitting || !form.formState.isValid}
            size='lg'
            type='submit'
          >
            Edit canvas
          </Button>
        </DialogClose>
      </form>
    </Form>
  );
}

export { EditCanvasForm };
