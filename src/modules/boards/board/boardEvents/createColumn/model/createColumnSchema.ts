import { z } from 'zod';

const createColumnSchema = z.object({
  title: z.string()
});

type CreateColumnFormValues = z.infer<typeof createColumnSchema>;

export { type CreateColumnFormValues, createColumnSchema };
