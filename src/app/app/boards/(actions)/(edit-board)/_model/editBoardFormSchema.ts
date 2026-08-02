import { z } from 'zod';

export const editBoardFormSchema = z.object({
  title: z.string().trim().min(1, 'Board name is required').max(120, 'Board name is too long')
});

export type EditBoardFormValues = z.infer<typeof editBoardFormSchema>;
