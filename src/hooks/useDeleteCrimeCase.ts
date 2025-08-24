
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useDeleteCrimeCase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (caseId: string): Promise<void> => {
      console.log('Deleting crime case with ID:', caseId);
      
      const { error } = await supabase.functions.invoke(`delete-crime-case/${caseId}`, {
        method: 'DELETE'
      });
      
      if (error) {
        console.error('Edge function error:', error);
        throw new Error(`Failed to delete crime case: ${error.message}`);
      }
      
      console.log('Crime case deleted successfully');
    },
    onSuccess: () => {
      // Invalidate and refetch crime cases list
      queryClient.invalidateQueries({ queryKey: ['crimeCases'] });
    },
  });
};
