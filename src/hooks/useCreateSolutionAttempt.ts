
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { components } from '@/openapi/crimeAiSchema';

type CreateSolutionAttemptDto = components['schemas']['CreateSolutionAttemptDto'];

export const useCreateSolutionAttempt = (caseId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateSolutionAttemptDto): Promise<string> => {
      console.log(`Creating solution attempt for case ${caseId}:`, data);
      
      const { data: response, error } = await supabase.functions.invoke('create-solution-attempt', {
        method: 'POST',
        body: { ...data, caseId },
      });
      
      if (error) {
        console.error('Edge function error:', error);
        throw new Error(`Failed to create solution attempt: ${error.message}`);
      }
      
      console.log('Solution attempt created with ID:', response);
      return response as string;
    },
    onSuccess: (_, variables) => {
      // Invalidate related queries to refresh data
      queryClient.invalidateQueries({
        queryKey: ['solutionAttempts', caseId]
      });
      queryClient.invalidateQueries({
        queryKey: ['solutionAttempts', caseId, variables.userId]
      });
    },
  });
};
