import { z } from 'zod';

export const registerFormSchema = z
  .object({
    email: z.string().min(1, 'Email is required').pipe(z.email('Invalid email address')),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(32, 'Password must be at most 6 characters')
      .regex(
        /^(?=.*[A-Z])(?=.*\d)[A-Z\d]+$/i,
        'Password must contain at least one letter and one number'
      ),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(32, 'Password must be at most 6 characters')
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        path: ['confirmPassword'],
        message: 'Password do not match',
        code: 'custom'
      });
    }
  });

export type RegisterFormValues = z.infer<typeof registerFormSchema>;
