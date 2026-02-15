import { toast } from 'sonner';

const appToast = {
  success(message: string) {
    toast.success(message, {
      position: 'top-center'
    });
  },

  error(message: string, error: string) {
    toast.error(message, { description: error });
  }
};

export { appToast };
