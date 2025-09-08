
import { supabase } from '@/integrations/supabase/client';
import type { components } from '@/openapi/crimeAiSchema';
import { useQuery } from '@tanstack/react-query';

type ResultSetAutopsyReport = components['schemas']['ResultSetAutopsyReport'];

export const useAutopsyReports = ({ reportAuthorId, victimId, notificationId }: { reportAuthorId?: number, victimId?: number, notificationId?: number }) => {
  return useQuery({
    queryKey: ['autopsy-reports', reportAuthorId, victimId, notificationId],
    queryFn: async (): Promise<ResultSetAutopsyReport> => {

      console.log(`Calling get-autopsy-reports edge function for reportAuthorId: ${reportAuthorId}, victimId: ${victimId}, notificationId: ${notificationId}`);
      let queryParams = '';
      if (reportAuthorId) {
        queryParams += `reportAuthorId=${encodeURIComponent(reportAuthorId)}`;
      }
      if (victimId) {
        queryParams += (queryParams.length > 0 ? '&' : '');
        queryParams += `victimId=${encodeURIComponent(victimId)}`;
      }
      if (notificationId) {
        queryParams += (queryParams.length > 0 ? '&' : '');
        queryParams += `notificationId=${encodeURIComponent(notificationId)}`;
      }


      const functionUrl = 'get-autopsy-reports' + (queryParams.length > 0 ? '?' + queryParams : '');

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
    enabled: !!reportAuthorId || !!victimId || !!notificationId, // Only run query if at least one parameter is defined
  });
};
