
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { components } from '@/openapi/crimeAiSchema';

type SolutionSpoilerDto = components['schemas']['SolutionSpoilerDto'];

export const useSolutionSpoiler = (caseId: string) => {
  return useQuery({
    queryKey: ['solution-spoiler', caseId],
    queryFn: async (): Promise<SolutionSpoilerDto> => {
      console.log(`Calling get-solution-spoiler edge function for case ID: ${caseId}`);
      
      const { data, error } = await supabase.functions.invoke(`get-solution-spoiler/${caseId}`, {
        method: 'GET',
      });
      
      if (error) {
        console.error('Edge function error:', error);
        throw new Error(`Failed to fetch solution spoiler: ${error.message}`);
      }
      
      console.log('Edge function response:', data);
      return data as SolutionSpoilerDto;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!caseId, // Only run query if caseId is provided
  });
};
