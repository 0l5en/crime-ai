
import type { paths } from '@/openapi/crimeAiSchema';
import { useQuery } from '@tanstack/react-query';
import { PATH_CRIME_AI_API } from './constants';

const REQUEST_PATH = '/crimecase/{id}/crimescene';
type CrimeSceneDto = paths[typeof REQUEST_PATH]['get']['responses']['200']['content']['application/json'];

export const useCrimeScene = (caseId: string) => {
  return useQuery({
    queryKey: [REQUEST_PATH, caseId],
    queryFn: async (): Promise<CrimeSceneDto> => {

      const response = await fetch(PATH_CRIME_AI_API + REQUEST_PATH.replace('{id}', caseId));

      if (response.ok) {
        const data = await response.json()
        return data as CrimeSceneDto;
      }

      throw new Error('Server returned error response: ' + response.status);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!caseId, // Only run query if caseId is provided
  });
};
