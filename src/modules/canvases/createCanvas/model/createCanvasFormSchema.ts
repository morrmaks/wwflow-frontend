import { z } from 'zod';

export const createCanvasFormSchema = z.object({
  name: z.string().trim().min(1, 'Canvas name is required').max(120, 'Canvas name is too long')
});

export type CreateCanvasFormValues = z.infer<typeof createCanvasFormSchema>;
