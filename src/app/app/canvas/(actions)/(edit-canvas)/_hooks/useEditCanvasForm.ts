import type { CanvasListFieldsFragment } from '@src/common/api/graphql/__generated__';

import { zodResolver } from '@hookform/resolvers/zod';
import { useImageUploadState } from '@src/app/app/(media)';
import { useForm } from 'react-hook-form';

import type { EditCanvasFormValues } from '../_model/editCanvasFormSchema';

import { editCanvasFormSchema } from '../_model/editCanvasFormSchema';
import { useUpdateCanvasMutation } from './useUpdateCanvasMutation';

function useEditCanvasForm(card: CanvasListFieldsFragment) {
  const { image, setImage, removed, setRemoved } = useImageUploadState();

  const [updateCanvas, { loading }] = useUpdateCanvasMutation();

  const form = useForm<EditCanvasFormValues>({
    resolver: zodResolver(editCanvasFormSchema),
    defaultValues: { title: card.title },
    mode: 'onChange'
  });

  const onSubmit = async (values: EditCanvasFormValues) => {
    await updateCanvas({
      variables: {
        canvasId: card.id,
        input: {
          title: values.title,
          previewImage: image,
          removePreview: removed
        }
      }
    });
  };

  return {
    image,
    setImage,
    removed,
    setRemoved,
    loading,
    form,
    onSubmit
  };
}

export { useEditCanvasForm };
