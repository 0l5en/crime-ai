
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { components } from '@/openapi/crimeAiSchema';

type ResultSetAutopsyReport = components['schemas']['ResultSetAutopsyReport'];

export const useAutopsyReports = (reportAuthorId?: number, victimId?: number) => {
  return useQuery({
    queryKey: ['autopsy-reports', reportAuthorId, victimId],
    queryFn: async (): Promise<ResultSetAutopsyReport> => {
      if (!reportAuthorId || !victimId) {
        throw new Error('reportAuthorId and victimId are required');
      }

      console.log(`Calling get-autopsy-reports edge function for reportAuthorId: ${reportAuthorId}, victimId: ${victimId}`);
      
      const functionUrl = `get-autopsy-reports?reportAuthorId=${reportAuthorId}&victimId=${victimId}`;
      
      const { data, error } = await supabase.functions.invoke(functionUrl, {
        method: 'GET',
      });
      
      if (error) {
        console.error('Edge function error:', error);
        throw new Error(`Failed to fetch autopsy reports: ${error.message}`);
      }
      
      console.log('Edge function response:', data);
      return data as ResultSetAutopsyReport;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!reportAuthorId && !!victimId, // Only run query if both IDs are provided
  });
};
