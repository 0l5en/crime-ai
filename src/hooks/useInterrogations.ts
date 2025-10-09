import type { paths } from '@/openapi/crimeAiSchema';
import { useQuery } from '@tanstack/react-query';
import { PATH_CRIME_AI_API } from './constants';

export const REQUEST_PATH = '/interrogation';
type ResultSetInterrogation = paths[typeof REQUEST_PATH]['get']['responses']['200']['content']['application/json'];

export const useInterrogations = (userId: string, personId: number) => {
  return useQuery({
    queryKey: [REQUEST_PATH, userId, personId],
    queryFn: async (): Promise<ResultSetInterrogation> => {

      // Build query parameters for the edge function
      const queryParams = new URLSearchParams({
        userId: userId,
        personId: personId.toString()
      });

      const queryString = queryParams.toString();
      const response = await fetch(PATH_CRIME_AI_API + REQUEST_PATH + (queryString ? `?${queryString}` : ''));

      if (response.ok) {
        const data = await response.json();
        return data as ResultSetInterrogation;
      }

      throw new Error('Server returned error response: ' + response.status);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!userId && !!personId, // Only run query if both parameters are provided
  });
};
