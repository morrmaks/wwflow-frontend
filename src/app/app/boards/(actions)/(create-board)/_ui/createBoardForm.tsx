'use client';

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

import { useCreateBoardForm } from '../_hooks/useCreateBoardForm';

function CreateBoardForm() {
  const { form, onSubmit, image, setImage, removed, setRemoved, loading } = useCreateBoardForm();

  return (
    <Form {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
        <ImageUploadInput
          imageFile={image}
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
            Create board
          </Button>
        </DialogClose>
      </form>
    </Form>
  );
}

export { CreateBoardForm };
