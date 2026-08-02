import { z } from 'zod';

export const createBoardFormSchema = z.object({
  title: z.string().trim().min(1, 'Board name is required').max(120, 'Board name is too long')
});

export type CreateBoardFormValues = z.infer<typeof createBoardFormSchema>;
