
import type { paths } from '@/openapi/crimeAiSchema';
import { useQuery } from '@tanstack/react-query';
import { PATH_CRIME_AI_API } from './constants';

const REQUEST_PATH = '/crimecase/{id}/person';
type ResultSetPerson = paths[typeof REQUEST_PATH]['get']['responses']['200']['content']['application/json'];

export const usePersons = (caseId: string, personRole?: string) => {
  return useQuery({
    queryKey: [REQUEST_PATH, caseId, personRole],
    queryFn: async (): Promise<ResultSetPerson> => {

      // Build query string from parameters
      const searchParams = new URLSearchParams();
      if (personRole) searchParams.append('personRole', personRole);
      const queryString = searchParams.toString();
      const response = await fetch(PATH_CRIME_AI_API + REQUEST_PATH.replace('{id}', caseId) + (queryString ? `?${queryString}` : ''));

      if (response.ok) {
        const data = response.json();
        return data as ResultSetPerson;
      }

      throw new Error('Server returned error response: ' + response.status);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!caseId, // Only run query if caseId is provided
  });
};
