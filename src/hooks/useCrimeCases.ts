
import type { paths } from '@/openapi/crimeAiSchema';
import { useQuery } from '@tanstack/react-query';
import { PATH_CRIME_AI_API } from './constants';

export const REQUEST_PATH = '/crimecase'
type ResultSetCrimeCase = paths[typeof REQUEST_PATH]['get']['responses']['200']['content']['application/json']
type CrimeCasesParams = paths[typeof REQUEST_PATH]['get']['parameters']['query'];

export const useCrimeCases = (params?: CrimeCasesParams) => {
  return useQuery({
    queryKey: [REQUEST_PATH, params],
    queryFn: async (): Promise<ResultSetCrimeCase> => {
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
      const response = await fetch(`${PATH_CRIME_AI_API}${REQUEST_PATH}` + (queryString ? `?${queryString}` : ''));

      if (response.ok) {
        const data = await response.json();
        return data as ResultSetCrimeCase;
      }

      throw new Error('Server returned error response: ' + response.status);

    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
