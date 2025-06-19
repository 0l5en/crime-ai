
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { components } from '@/openapi/crimeAiSchema';

type ResultSetEvidence = components['schemas']['ResultSetEvidence'];

export const useCaseEvidences = (caseId: string) => {
  return useQuery({
    queryKey: ['caseEvidences', caseId],
    queryFn: async (): Promise<ResultSetEvidence> => {
      console.log(`Calling fetch-case-evidences edge function for case ID: ${caseId}`);
      
      const { data, error } = await supabase.functions.invoke(`fetch-case-evidences/${caseId}`, {
        method: 'GET',
      });
      
      if (error) {
        console.error('Edge function error:', error);
        throw new Error(`Failed to fetch case evidences: ${error.message}`);
      }
      
      console.log('Edge function response:', data);
      return data as ResultSetEvidence;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!caseId, // Only run query if caseId is provided
  });
};
