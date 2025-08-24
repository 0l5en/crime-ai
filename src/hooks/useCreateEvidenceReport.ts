
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { CreateEvidenceReportDto } from '../../supabase/functions/_shared/crime-api-types';

export const useCreateEvidenceReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (createEvidenceReportDto: CreateEvidenceReportDto): Promise<void> => {
      console.log('Creating evidence report:', createEvidenceReportDto);
      
      const { error } = await supabase.functions.invoke('create-evidence-report', {
        body: createEvidenceReportDto
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
