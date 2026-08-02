import { z } from 'zod';

export const editCanvasFormSchema = z.object({
  title: z.string().trim().min(1, 'Canvas name is required').max(120, 'Canvas name is too long')
});

export type EditCanvasFormValues = z.infer<typeof editCanvasFormSchema>;
