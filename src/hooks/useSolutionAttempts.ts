
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { components } from '@/openapi/crimeAiSchema';

type ResultSetSolutionAttempt = components['schemas']['ResultSetSolutionAttempt'];

export const useSolutionAttempts = (caseId: string, userId?: string, success?: string) => {
  return useQuery({
    queryKey: ['solutionAttempts', caseId, userId, success],
    queryFn: async (): Promise<ResultSetSolutionAttempt> => {
      console.log(`Calling fetch-solution-attempts edge function for case ID: ${caseId}`);
      
      const { data, error } = await supabase.functions.invoke('fetch-solution-attempts', {
        method: 'POST',
        body: { caseId, userId, success },
      });
      
      if (error) {
        console.error('Edge function error:', error);
        throw new Error(`Failed to fetch solution attempts: ${error.message}`);
      }
      
      console.log('Edge function response:', data);
      return data as ResultSetSolutionAttempt;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes (shorter cache for attempts)
    enabled: !!caseId, // Only run query if caseId is provided
  });
};
