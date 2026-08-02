'use client';

import type { BoardListFieldsFragment } from '@src/common/api/graphql/__generated__';

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

import { useEditBoardForm } from '../_hooks/useEditBoardForm';

interface EditBoardFormProps {
  board: BoardListFieldsFragment;
}

function EditBoardForm({ board }: EditBoardFormProps) {
  const { form, onSubmit, loading, image, setImage, setRemoved, removed } = useEditBoardForm(board);

  return (
    <Form {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
        <ImageUploadInput
          imageFile={image}
          preview={board.previewUrl}
          setImageFile={setImage}
          removed={removed}
          setRemoved={setRemoved}
        />
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>Board name</FormLabel>
              <FormControl>
                <Input autoFocus={false} placeholder='My board' {...field} />
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
            Edit board
          </Button>
        </DialogClose>
      </form>
    </Form>
  );
}

export { EditBoardForm };
