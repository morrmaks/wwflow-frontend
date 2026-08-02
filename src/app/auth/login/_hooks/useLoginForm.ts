import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import type { LoginFormValues } from '../_model/loginFormSchema';

import { loginFormSchema } from '../_model/loginFormSchema';
import { useLoginMutation } from './useLoginMutation';

function useLoginForm(initialFormState: LoginFormValues) {
  const [login, { loading }] = useLoginMutation();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: initialFormState,
    mode: 'onChange'
  });

  const onSubmit = (data: LoginFormValues) => {
    login({ variables: data });
  };

  return {
    form,
    onSubmit,
    loading
  };
}

export { useLoginForm };
