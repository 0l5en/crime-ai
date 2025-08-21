
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { ResultSetPerson } from '../../supabase/functions/_shared/crime-api-types';

export const useVictims = (caseId: string) => {
  return useQuery({
    queryKey: ['victims', caseId],
    queryFn: async (): Promise<ResultSetPerson> => {
      console.log('Fetching victims for case ID:', caseId);
      
      const { data, error } = await supabase.functions.invoke('get-victims', {
        body: { caseId }
      });
      
      if (error) {
        console.error('Edge function error:', error);
        throw new Error(`Failed to fetch victims: ${error.message}`);
      }
      
      console.log('Victims response:', data);
      return data as ResultSetPerson;
    },
    enabled: !!caseId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
