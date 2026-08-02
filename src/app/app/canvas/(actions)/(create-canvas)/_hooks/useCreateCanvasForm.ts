import { zodResolver } from '@hookform/resolvers/zod';
import { useImageUploadState } from '@src/app/app/(media)';
import { useForm } from 'react-hook-form';

import type { CreateCanvasFormValues } from '../_model/createCanvasFormSchema';

import { useCreateCanvasMutation } from '../_hooks/useCreateCanvasMutation';
import { createCanvasFormSchema } from '../_model/createCanvasFormSchema';

function useCreateCanvasForm() {
  const imageState = useImageUploadState();

  const [createCanvas, { loading }] = useCreateCanvasMutation();

  const form = useForm<CreateCanvasFormValues>({
    resolver: zodResolver(createCanvasFormSchema),
    defaultValues: { title: '' },
    mode: 'onChange'
  });

  const onSubmit = async (values: CreateCanvasFormValues) => {
    await createCanvas({
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

export { useCreateCanvasForm };
