
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { components } from '@/openapi/crimeAiSchema';

type ResultSetQuestionAndAnswer = components['schemas']['ResultSetQuestionAndAnswer'];

export const useQuestionAndAnswers = (
  interrogationId?: string,
  referenceId?: number,
  referenceType?: 'EVIDENCE_REPORT'
) => {
  return useQuery({
    queryKey: referenceId 
      ? ['questionAndAnswers', 'reference', referenceId, referenceType]
      : ['questionAndAnswers', interrogationId],
    queryFn: async (): Promise<ResultSetQuestionAndAnswer> => {
      if (referenceId && referenceType) {
        console.log(`Calling list-interrogations for reference ${referenceId} with type ${referenceType}`);
        
        // First get interrogations with reference filter
        const { data: interrogationsData, error: interrogationsError } = await supabase.functions.invoke('list-interrogations', {
          method: 'GET',
          body: { referenceId: referenceId.toString(), referenceType }
        });
        
        if (interrogationsError) {
          console.error('Edge function error:', interrogationsError);
          throw new Error(`Failed to fetch interrogations: ${interrogationsError.message}`);
        }
        
        console.log('Interrogations response:', interrogationsData);
        
        // If we have interrogations, get Q&A for the first one
        if (interrogationsData?.items && interrogationsData.items.length > 0) {
          const firstInterrogation = interrogationsData.items[0];
          console.log(`Getting Q&A for interrogation ${firstInterrogation.id}`);
          
          const { data: qaData, error: qaError } = await supabase.functions.invoke(`get-question-answers/${firstInterrogation.id}`, {
            method: 'GET',
          });
          
          if (qaError) {
            console.error('Edge function error:', qaError);
            throw new Error(`Failed to fetch question and answers: ${qaError.message}`);
          }
          
          console.log('Q&A response:', qaData);
          return qaData as ResultSetQuestionAndAnswer;
        }
        
        // No interrogations found, return empty result
        return { items: [] };
      } else if (interrogationId) {
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
      }
      
      throw new Error('Either interrogationId or reference parameters must be provided');
    },
    staleTime: 30 * 1000, // 30 seconds (more frequent updates for chat-like interface)
    enabled: !!(interrogationId || (referenceId && referenceType)), // Only run query if we have the required parameters
  });
};
