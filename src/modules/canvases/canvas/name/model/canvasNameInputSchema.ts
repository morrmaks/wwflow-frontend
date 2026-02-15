import { z } from 'zod';

const canvasNameSchema = z.object({
  name: z.string().trim().min(1, 'Canvas name is required').max(120, 'Canvas name is too long')
});

type CanvasNameInputValue = z.infer<typeof canvasNameSchema>;

export { type CanvasNameInputValue, canvasNameSchema };
