import type { BoardListFieldsFragment } from '@src/common/api/graphql/__generated__';

import { zodResolver } from '@hookform/resolvers/zod';
import { useImageUploadState } from '@src/app/app/(media)';
import { useForm } from 'react-hook-form';

import type { EditBoardFormValues } from '../_model/editBoardFormSchema';

import { editBoardFormSchema } from '../_model/editBoardFormSchema';
import { useUpdateBoardMutation } from './useUpdateBoardMutation';

function useEditBoardForm(card: BoardListFieldsFragment) {
  const { image, setImage, removed, setRemoved } = useImageUploadState();

  const [updateBoard, { loading }] = useUpdateBoardMutation();

  const form = useForm<EditBoardFormValues>({
    resolver: zodResolver(editBoardFormSchema),
    defaultValues: { title: card.title },
    mode: 'onChange'
  });

  const onSubmit = async (values: EditBoardFormValues) => {
    await updateBoard({
      variables: {
        boardId: card.id,
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

export { useEditBoardForm };
