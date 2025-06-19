
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { components } from '@/openapi/crimeAiSchema';

type CrimeCaseDto = components['schemas']['CrimeCaseDto'];

export const useCrimeCase = (caseId: string) => {
  return useQuery({
    queryKey: ['crimeCase', caseId],
    queryFn: async (): Promise<CrimeCaseDto> => {
      console.log(`Calling fetch-single-crime-case edge function for case ID: ${caseId}`);
      
      const { data, error } = await supabase.functions.invoke(`fetch-single-crime-case/${caseId}`, {
        method: 'GET',
      });
      
      if (error) {
        console.error('Edge function error:', error);
        throw new Error(`Failed to fetch crime case: ${error.message}`);
      }
      
      console.log('Edge function response:', data);
      return data as CrimeCaseDto;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!caseId, // Only run query if caseId is provided
  });
};
