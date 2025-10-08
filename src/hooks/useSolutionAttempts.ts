import type { paths } from '@/openapi/crimeAiSchema';
import { useQuery } from '@tanstack/react-query';
import { PATH_CRIME_AI_API } from './constants';

const REQUEST_PATH = '/crimecase/{id}/solution-attempt';
type ResultSetSolutionAttempt = paths[typeof REQUEST_PATH]['get']['responses']['200']['content']['application/json'];

export const useSolutionAttempts = (caseId: string, userId?: string, success?: string) => {
  return useQuery({
    queryKey: [REQUEST_PATH, caseId, userId, success],
    queryFn: async (): Promise<ResultSetSolutionAttempt> => {

      const searchParams = new URLSearchParams();
      if (userId) searchParams.append('userId', userId);
      if (success) searchParams.append('success', success);
      const queryString = searchParams.toString();
      const response = await fetch(`${PATH_CRIME_AI_API}${REQUEST_PATH}` + (queryString ? `?${queryString}` : ''));

      if (response.ok) {
        const data = await response.json();
        return data as ResultSetSolutionAttempt;
      }

      throw new Error('Server returned error response: ' + response.status);
    },
    staleTime: 2 * 60 * 1000, // 2 minutes (shorter cache for attempts)
    enabled: !!caseId, // Only run query if caseId is provided
  });
};
