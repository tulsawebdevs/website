import { useCallback } from 'react';
import { useToast } from '../components/ui/use-toast.ts';

export function useErrorToast() {
  const { toast } = useToast();

  return useCallback(
    (params: { title: string; description?: string }) => {
      toast({
        title: params.title,
        description: params.description,
        className:
          'first-line:font-bold first-line:font-lg w-auto bg-red-500 text-white p-4 rounded-lg content-center',
      });
    },
    [toast],
  );
}
