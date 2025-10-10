import type { paths } from '@/openapi/crimeAiSchema';
import { useQuery } from '@tanstack/react-query';
import { PATH_CRIME_AI_API } from './constants';

const REQUEST_PATH = '/crimecase/{id}/evidence';
type ResultSetEvidence = paths[typeof REQUEST_PATH]['get']['responses']['200']['content']['application/json'];

export const useSolutionEvidences = (caseId: string) => {
  return useQuery({
    queryKey: [REQUEST_PATH, caseId, 'solutionEvidence=1'],
    queryFn: async (): Promise<ResultSetEvidence> => {
      const response = await fetch(
        PATH_CRIME_AI_API + REQUEST_PATH.replace('{id}', caseId) + '?solutionEvidence=1'
      );

      if (response.ok) {
        const data = await response.json();
        return data as ResultSetEvidence;
      }

      throw new Error('Server returned error response: ' + response.status);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!caseId, // Only run query if caseId is provided
  });
};
