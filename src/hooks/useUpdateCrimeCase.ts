import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { components } from '@/openapi/crimeAiSchema';

type CrimeCaseDto = components['schemas']['CrimeCaseDto'];

export const useUpdateCrimeCase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ caseId, updateData }: { caseId: string; updateData: Partial<CrimeCaseDto> }): Promise<void> => {
      console.log('Updating crime case:', caseId, updateData);
      
      const { error } = await supabase.functions.invoke(`update-crime-case/${caseId}`, {
        method: 'PATCH',
        body: updateData
      });
      
      if (error) {
        console.error('Edge function error:', error);
        throw new Error(`Failed to update crime case: ${error.message}`);
      }
      
      console.log('Crime case updated successfully');
    },
    onSuccess: () => {
      // Invalidate and refetch crime cases list
      queryClient.invalidateQueries({ queryKey: ['crimeCases'] });
    },
  });
};