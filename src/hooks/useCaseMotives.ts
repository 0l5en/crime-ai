
import type { paths } from '@/openapi/crimeAiSchema';
import { useQuery } from '@tanstack/react-query';
import { PATH_CRIME_AI_API } from './constants';

const REQUEST_PATH = '/crimecase/{id}/motive';
type ResultSetMotive = paths[typeof REQUEST_PATH]['get']['responses']['200']['content']['application/json'];

export const useCaseMotives = (caseId: string, personId?: string) => {
  return useQuery({
    queryKey: [REQUEST_PATH, caseId, personId],
    queryFn: async (): Promise<ResultSetMotive> => {
      const searchParams = new URLSearchParams();
      if (personId) searchParams.append('personId', personId);
      const queryString = searchParams.toString();
      
      const response = await fetch(
        PATH_CRIME_AI_API + REQUEST_PATH.replace('{id}', caseId) + (queryString ? `?${queryString}` : '')
      );

      if (response.ok) {
        const data = await response.json();
        return data as ResultSetMotive;
      }

      throw new Error('Server returned error response: ' + response.status);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!caseId, // Only run query if caseId is provided
  });
};
