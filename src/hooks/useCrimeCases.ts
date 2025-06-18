
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { components } from '@/openapi/crimeAiSchema';

type ResultSetCrimeCase = components['schemas']['ResultSetCrimeCase'];

export const useCrimeCases = () => {
  return useQuery({
    queryKey: ['crimeCases'],
    queryFn: async (): Promise<ResultSetCrimeCase> => {
      console.log('Calling fetch-crime-cases edge function...');
      
      const { data, error } = await supabase.functions.invoke('fetch-crime-cases');
      
      if (error) {
        console.error('Edge function error:', error);
        throw new Error(`Failed to fetch crime cases: ${error.message}`);
      }
      
      console.log('Edge function response:', data);
      return data as ResultSetCrimeCase;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};
