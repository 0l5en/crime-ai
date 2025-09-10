
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { components } from '@/openapi/crimeAiSchema';

type ResultSetCrimeCase = components['schemas']['ResultSetCrimeCase'];

// Define parameters interface for useCrimeCases hook
interface CrimeCasesParams {
  maxResults?: string;
  caseGeneratorFormType?: string;
  userId?: string;
  status?: string;
}

export const useCrimeCases = (params?: CrimeCasesParams) => {
  return useQuery({
    queryKey: ['crimeCases', params],
    queryFn: async (): Promise<ResultSetCrimeCase> => {
      console.log('Calling fetch-crime-cases edge function with params:', params);
      
      // Build query string from parameters
      const searchParams = new URLSearchParams();
      if (params?.maxResults) searchParams.append('maxResults', params.maxResults);
      if (params?.caseGeneratorFormType) searchParams.append('caseGeneratorFormType', params.caseGeneratorFormType);
      if (params?.userId) searchParams.append('userId', params.userId);
      if (params?.status) {
        // Support comma-separated status values
        params.status.split(',').forEach(status => 
          searchParams.append('status', status.trim())
        );
      }
      
      const queryString = searchParams.toString();
      const functionName = queryString ? `fetch-crime-cases?${queryString}` : 'fetch-crime-cases';
      
      const { data, error } = await supabase.functions.invoke(functionName);
      
      if (error) {
        console.error('Edge function error:', error);
        throw new Error(`Failed to fetch crime cases: ${error.message}`);
      }
      
      console.log('Edge function response:', data);
      return data as ResultSetCrimeCase;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
