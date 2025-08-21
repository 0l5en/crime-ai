
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { TemplateContextDto } from '../../supabase/functions/_shared/crime-api-types';

export const useCreateCrimeCase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (templateContext: TemplateContextDto): Promise<{ locationUrl: string }> => {
      console.log('Creating new crime case with template context:', templateContext);
      
      const { data, error } = await supabase.functions.invoke('create-crime-case', {
        body: templateContext
      });
      
      if (error) {
        console.error('Edge function error:', error);
        throw new Error(`Failed to create crime case: ${error.message}`);
      }
      
      console.log('Crime case creation response:', data);
      
      if (!data?.locationUrl) {
        throw new Error('No location URL returned from crime case creation');
      }
      
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch crime cases list
      queryClient.invalidateQueries({ queryKey: ['crimeCases'] });
    },
  });
};
