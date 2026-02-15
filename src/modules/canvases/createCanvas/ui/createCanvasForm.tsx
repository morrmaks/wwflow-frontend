'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/common/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/common/ui/form';
import { Input } from '@/common/ui/input';
import { InviteEmailsInput, InviteEmailsList, useInviteState } from '@/modules/invites';
import { ImageUploadInput, useImageUploadState } from '@/modules/media';

import type { CreateCanvasFormValues } from '../model/createCanvasFormSchema';

import { useCreateCanvasMutation } from '../hooks/useCreateCanvasMutation';
import { createCanvasFormSchema } from '../model/createCanvasFormSchema';

function CreateCanvasForm() {
  const { image, setImage, removed, setRemoved } = useImageUploadState();
  const { getStatus, addedInvites, setAddedInvites } = useInviteState();

  const [createCanvas, { loading }] = useCreateCanvasMutation();

  const form = useForm<CreateCanvasFormValues>({
    resolver: zodResolver(createCanvasFormSchema),
    defaultValues: { name: '' },
    mode: 'onChange'
  });

  const onSubmit = async (values: CreateCanvasFormValues) => {
    await createCanvas({
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
          Create canvas
        </Button>
      </form>
    </Form>
  );
}

export { CreateCanvasForm };
