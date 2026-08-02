import { zodResolver } from '@hookform/resolvers/zod';
import { useImageUploadState } from '@src/app/app/(media)';
import { useForm } from 'react-hook-form';

import type { CreateBoardFormValues } from '../_model/createBoardFormSchema';

import { createBoardFormSchema } from '../_model/createBoardFormSchema';
import { useCreateBoardMutation } from './useCreateBoardMutation';

function useCreateBoardForm() {
  const imageState = useImageUploadState();

  const [createBoard, { loading }] = useCreateBoardMutation();

  const form = useForm<CreateBoardFormValues>({
    resolver: zodResolver(createBoardFormSchema),
    defaultValues: { title: '' },
    mode: 'onChange'
  });

  const onSubmit = async (values: CreateBoardFormValues) => {
    await createBoard({
      variables: {
        title: values.title,
        previewUrl: imageState.image
      }
    });
  };

  return {
    form,
    onSubmit,
    loading,
    ...imageState
  };
}

export { useCreateBoardForm };
