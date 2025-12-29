import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

import type { LogoutMutation, LogoutMutationVariables } from '@/common/api/graphql/__generated__';

import { forceLogout } from '@/common/api/client/session';
import { LogoutDocument } from '@/common/api/graphql/__generated__';

function useLogoutMutation() {
  return useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, {
    onCompleted: () => forceLogout(),
    onError: (error) => {
      toast.error('Logout error:', { description: error.message });
    }
  });
}

export { useLogoutMutation };
