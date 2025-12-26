import { z } from 'zod';

export const registerFormSchema = z.object({
  email: z.string().min(1, 'Введите email').email('Некорректный email'),
  password: z.string().min(6, 'Минимум 6 символов').max(32, 'Максимум 32 символа'),
  currentPassword: z.string().min(6, 'Минимум 6 символов').max(32, 'Максимум 32 символа')
});

export type RegisterFormValues = z.infer<typeof registerFormSchema>;
