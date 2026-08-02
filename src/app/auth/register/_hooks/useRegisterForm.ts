import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import type { RegisterFormValues } from '../_model/registerFormSchema';

import { registerFormSchema } from '../_model/registerFormSchema';
import { useRegisterMutation } from './useRegisterMutation';

function useRegisterForm(initialFormState: RegisterFormValues) {
  const [register, { loading }] = useRegisterMutation();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: initialFormState,
    mode: 'onChange'
  });

  const onPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void
  ) => {
    onChange(e.target.value);

    if (!form.getValues('confirmPassword')) return;
    form.trigger('confirmPassword');
  };

  const onSubmit = (data: RegisterFormValues) => {
    register({ variables: data });
  };

  return {
    form,
    loading,
    onSubmit,
    onPasswordChange
  };
}

export { useRegisterForm };
