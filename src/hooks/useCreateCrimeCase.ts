
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { components } from '@/openapi/crimeAiSchema';

type CreateCrimeCaseDto = components['schemas']['CreateCrimeCaseDto'];

export const useCreateCrimeCase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (caseData: CreateCrimeCaseDto) => {
      console.log('Creating new crime case with data:', caseData);
      
      const { data, error } = await supabase.functions.invoke('create-crime-case', {
        body: caseData
      });
      
      if (error) {
        console.error('Edge function error:', error);
        throw new Error(`Failed to create crime case: ${error.message}`);
      }
      
      console.log('Crime case creation response:', data);
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch crime cases list
      queryClient.invalidateQueries({ queryKey: ['crimeCases'] });
    },
  });
};
