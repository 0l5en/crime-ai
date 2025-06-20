
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { components } from '@/openapi/crimeAiSchema';

type ResultSetPerson = components['schemas']['ResultSetPerson'];

export const useCaseSuspects = (caseId: string) => {
  return useQuery({
    queryKey: ['caseSuspects', caseId],
    queryFn: async (): Promise<ResultSetPerson> => {
      console.log(`Calling fetch-case-suspects edge function for case ID: ${caseId}`);
      
      const { data, error } = await supabase.functions.invoke(`fetch-case-suspects/${caseId}`, {
        method: 'GET',
      });
      
      if (error) {
        console.error('Edge function error:', error);
        throw new Error(`Failed to fetch suspects: ${error.message}`);
      }
      
      console.log('Edge function response:', data);
      return data as ResultSetPerson;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!caseId, // Only run query if caseId is provided
  });
};
