
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { components } from '@/openapi/crimeAiSchema';

type ResultSetEvidenceReport = components['schemas']['ResultSetEvidenceReport'];

export const useEvidenceReports = (evidenceId: string, personId?: string) => {
  return useQuery({
    queryKey: ['evidenceReports', evidenceId, personId],
    queryFn: async (): Promise<ResultSetEvidenceReport> => {
      console.log(`Calling list-evidence-reports edge function for evidence ID: ${evidenceId}`);
      
      const { data, error } = await supabase.functions.invoke(`list-evidence-reports/${evidenceId}`, {
        method: 'GET',
      });
      
      if (error) {
        console.error('Edge function error:', error);
        throw new Error(`Failed to fetch evidence reports: ${error.message}`);
      }
      
      console.log('Edge function response:', data);
      return data as ResultSetEvidenceReport;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!evidenceId, // Only run query if evidenceId is provided
  });
};
