import type { paths } from '@/openapi/crimeAiSchema';
import { useQuery } from '@tanstack/react-query';
import { PATH_CRIME_AI_API } from './constants';

export const REQUEST_PATH = '/autopsy-report-request';
type ResultSetAutopsyReportRequest = paths[typeof REQUEST_PATH]['get']['responses']['200']['content']['application/json'];

export const useAutopsyReportRequests = (victimId?: string) => {
  return useQuery({
    queryKey: [REQUEST_PATH, victimId],
    queryFn: async (): Promise<ResultSetAutopsyReportRequest> => {

      const searchParams = new URLSearchParams();
      if (victimId) searchParams.append('victimId', victimId);

      const queryString = searchParams.toString();
      const response = await fetch(PATH_CRIME_AI_API + REQUEST_PATH + (queryString ? `?${queryString}` : ''));

      if (response.ok) {
        const data = await response.json();
        return data as ResultSetAutopsyReportRequest;
      }

      throw new Error('Server returned error response: ' + response.status);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
