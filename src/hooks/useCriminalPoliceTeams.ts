
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { ResultSetCriminalPoliceTeamDto } from '../../supabase/functions/_shared/crime-api-types';

export const useCriminalPoliceTeams = (caseId: string) => {
  return useQuery({
    queryKey: ['criminalPoliceTeams', caseId],
    queryFn: async (): Promise<ResultSetCriminalPoliceTeamDto> => {
      console.log(`Calling list-criminal-police-teams edge function for case ID: ${caseId}`);
      
      const { data, error } = await supabase.functions.invoke(`list-criminal-police-teams/${caseId}`, {
        method: 'GET',
      });
      
      if (error) {
        console.error('Edge function error:', error);
        throw new Error(`Failed to fetch criminal police teams: ${error.message}`);
      }
      
      console.log('Edge function response:', data);
      return data as ResultSetCriminalPoliceTeamDto;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!caseId, // Only run query if caseId is provided
  });
};
