'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/common/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/common/ui/form';
import { Input } from '@/common/ui/input';
import { InviteEmailsInput, InviteEmailsList, useInviteState } from '@/modules/invites';
import { ImageUploadInput, useImageUploadState } from '@/modules/media';

import type { CreateBoardFormValues } from '../model/createBoardFormSchema';

import { useCreateBoardMutation } from '../hooks/useCreateBoardMutation';
import { createBoardFormSchema } from '../model/createBoardFormSchema';

function CreateBoardForm() {
  const { image, setImage, removed, setRemoved } = useImageUploadState();
  const { getStatus, addedInvites, setAddedInvites } = useInviteState();

  const [createBoard, { loading }] = useCreateBoardMutation();

  const form = useForm<CreateBoardFormValues>({
    resolver: zodResolver(createBoardFormSchema),
    defaultValues: { name: '' },
    mode: 'onChange'
  });

  const onSubmit = async (values: CreateBoardFormValues) => {
    await createBoard({
      variables: {
        name: values.name,
        inviteEmails: addedInvites,
        previewImage: image
      }
    });
  };

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
          name='name'
          control={form.control}
        />

        <InviteEmailsInput
          getStatus={getStatus}
          invites={addedInvites}
          setInvites={setAddedInvites}
        />
        <InviteEmailsList emails={addedInvites} setInvites={setAddedInvites} />

        <Button
          className='w-full mt-4'
          disabled={loading || form.formState.isSubmitting || !form.formState.isValid}
          size='lg'
          type='submit'
        >
          Create board
        </Button>
      </form>
    </Form>
  );
}

export { CreateBoardForm };
