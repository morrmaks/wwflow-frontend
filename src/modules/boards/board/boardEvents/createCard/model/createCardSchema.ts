import { z } from 'zod';

const createCardSchema = z.object({
  title: z.string()
});

type CreateCardFormValues = z.infer<typeof createCardSchema>;

export { type CreateCardFormValues, createCardSchema };
