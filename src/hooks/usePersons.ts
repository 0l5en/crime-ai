
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { components } from '@/openapi/crimeAiSchema';

type ResultSetPerson = components['schemas']['ResultSetPerson'];

export const usePersons = (caseId: string, personRole?: string) => {
  return useQuery({
    queryKey: ['persons', caseId, personRole],
    queryFn: async (): Promise<ResultSetPerson> => {
      console.log(`Calling get-persons edge function for case ID: ${caseId}, personRole: ${personRole || 'all'}`);
      
      let functionUrl = `get-persons/${caseId}`;
      if (personRole) {
        // Updated parameter name from personType to personRole to match OpenAPI spec
        functionUrl += `?personRole=${encodeURIComponent(personRole)}`;
      }
      
      const { data, error } = await supabase.functions.invoke(functionUrl, {
        method: 'GET',
      });
      
      if (error) {
        console.error('Edge function error:', error);
        throw new Error(`Failed to fetch persons: ${error.message}`);
      }
      
      console.log('Edge function response:', data);
      return data as ResultSetPerson;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!caseId, // Only run query if caseId is provided
  });
};
