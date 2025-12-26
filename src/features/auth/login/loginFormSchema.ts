import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().min(1, 'Введите email').email('Некорректный email'),
  password: z.string().min(1, 'Введите пароль')
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
