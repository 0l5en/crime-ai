
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { CreateEvidenceReportDto } from '../../supabase/functions/_shared/crime-api-types';

export const useCreateEvidenceReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (createEvidenceReportDto: CreateEvidenceReportDto): Promise<void> => {
      console.log('Creating evidence report:', createEvidenceReportDto);
      
      // Validate that only evidenceId and personId are provided (matching OpenAPI spec)
      const { evidenceId, personId } = createEvidenceReportDto;
      if (!evidenceId || !personId) {
        throw new Error('Both evidenceId and personId are required');
      }
      
      const { error } = await supabase.functions.invoke('create-evidence-report', {
        body: { evidenceId, personId }
      });
      
      if (error) {
        console.error('Edge function error:', error);
        throw new Error(`Failed to create evidence report: ${error.message}`);
      }
      
      console.log('Evidence report created successfully');
    },
    onSuccess: () => {
      // Invalidate and refetch evidence reports
      queryClient.invalidateQueries({ queryKey: ['evidenceReports'] });
    },
  });
};
