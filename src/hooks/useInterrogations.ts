
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { components } from '@/openapi/crimeAiSchema';

type ResultSetInterrogation = components['schemas']['ResultSetInterrogation'];

export const useInterrogations = (userId: string, personId: number) => {
  return useQuery({
    queryKey: ['interrogations', userId, personId],
    queryFn: async (): Promise<ResultSetInterrogation> => {
      console.log(`Calling list-interrogations edge function for user ${userId} and person ${personId}`);
      
      const { data, error } = await supabase.functions.invoke('list-interrogations', {
        method: 'POST',
        body: { userId, personId },
      });
      
      if (error) {
        console.error('Edge function error:', error);
        throw new Error(`Failed to fetch interrogations: ${error.message}`);
      }
      
      console.log('Edge function response:', data);
      return data as ResultSetInterrogation;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!userId && !!personId, // Only run query if both parameters are provided
  });
};
