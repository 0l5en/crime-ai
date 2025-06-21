
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { components } from '@/openapi/crimeAiSchema';

type ResultSetQuestionAndAnswer = components['schemas']['ResultSetQuestionAndAnswer'];

export const useQuestionAndAnswers = (interrogationId: string) => {
  return useQuery({
    queryKey: ['questionAndAnswers', interrogationId],
    queryFn: async (): Promise<ResultSetQuestionAndAnswer> => {
      console.log(`Calling get-question-answers edge function for interrogation ${interrogationId}`);
      
      const { data, error } = await supabase.functions.invoke(`get-question-answers/${interrogationId}`, {
        method: 'GET',
      });
      
      if (error) {
        console.error('Edge function error:', error);
        throw new Error(`Failed to fetch question and answers: ${error.message}`);
      }
      
      console.log('Edge function response:', data);
      return data as ResultSetQuestionAndAnswer;
    },
    staleTime: 30 * 1000, // 30 seconds (more frequent updates for chat-like interface)
    enabled: !!interrogationId, // Only run query if interrogationId is provided
  });
};
