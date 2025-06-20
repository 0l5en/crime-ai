
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { components } from '@/openapi/crimeAiSchema';

type CrimeSceneDto = components['schemas']['CrimeSceneDto'];

export const useCrimeScene = (caseId: string) => {
  return useQuery({
    queryKey: ['crimeScene', caseId],
    queryFn: async (): Promise<CrimeSceneDto> => {
      console.log(`Calling fetch-crime-scene edge function for case ID: ${caseId}`);
      
      const { data, error } = await supabase.functions.invoke(`fetch-crime-scene/${caseId}`, {
        method: 'GET',
      });
      
      if (error) {
        console.error('Edge function error:', error);
        throw new Error(`Failed to fetch crime scene: ${error.message}`);
      }
      
      console.log('Edge function response:', data);
      return data as CrimeSceneDto;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!caseId, // Only run query if caseId is provided
  });
};
