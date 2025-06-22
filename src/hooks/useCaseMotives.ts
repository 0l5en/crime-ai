
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { components } from '@/openapi/crimeAiSchema';

type ResultSetMotive = components['schemas']['ResultSetMotive'];

export const useCaseMotives = (caseId: string) => {
  return useQuery({
    queryKey: ['caseMotives', caseId],
    queryFn: async (): Promise<ResultSetMotive> => {
      console.log(`Calling fetch-case-motives edge function for case ID: ${caseId}`);
      
      const { data, error } = await supabase.functions.invoke(`fetch-case-motives/${caseId}`, {
        method: 'GET',
      });
      
      if (error) {
        console.error('Edge function error:', error);
        throw new Error(`Failed to fetch case motives: ${error.message}`);
      }
      
      console.log('Edge function response:', data);
      return data as ResultSetMotive;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!caseId, // Only run query if caseId is provided
  });
};
