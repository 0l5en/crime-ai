
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { TemplateContextDto } from '../../supabase/functions/_shared/crime-api-types';

export const useTemplateContext = (templateId: number | null) => {
  return useQuery({
    queryKey: ['templateContext', templateId],
    queryFn: async (): Promise<TemplateContextDto> => {
      if (!templateId) {
        throw new Error('Template ID is required');
      }

      console.log('Fetching template context for ID:', templateId);
      
      const { data, error } = await supabase.functions.invoke('get-template-context', {
        body: { templateId }
      });
      
      if (error) {
        console.error('Edge function error:', error);
        throw new Error(`Failed to fetch template context: ${error.message}`);
      }
      
      console.log('Template context response:', data);
      return data as TemplateContextDto;
    },
    enabled: !!templateId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
