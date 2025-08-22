
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { components } from '@/openapi/crimeAiSchema';

type CreateInterrogationAnswerDto = components['schemas']['CreateInterrogationAnswerDto'];

export const useCreateInterrogationAnswer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateInterrogationAnswerDto): Promise<string> => {
      console.log(`Creating interrogation answer:`, data);
      
      const { data: response, error } = await supabase.functions.invoke('create-interrogation-answer', {
        method: 'POST',
        body: data,
      });
      
      if (error) {
        console.error('Edge function error:', error);
        throw new Error(`Failed to create interrogation answer: ${error.message}`);
      }
      
      console.log('Answer created with ID:', response);
      return response as string;
    },
    onSuccess: (_, variables) => {
      // Invalidate related queries to refresh data
      queryClient.invalidateQueries({
        queryKey: ['interrogations', variables.userId, variables.personId]
      });
      queryClient.invalidateQueries({
        queryKey: ['questionAndAnswers']
      });
      // Invalidate evidence report specific queries if reference is used
      if (variables.reference) {
        queryClient.invalidateQueries({
          queryKey: ['questionAndAnswers', 'reference', variables.reference.referenceId]
        });
      }
    },
  });
};
