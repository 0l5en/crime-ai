
import { paths } from '@/openapi/crimeAiSchema';
import { useQuery } from '@tanstack/react-query';
import { PATH_CRIME_AI_API } from './constants';

const REQUEST_PATH = '/autopsy-report';
type ResultSetAutopsyReport = paths[typeof REQUEST_PATH]['get']['responses']['200']['content']['application/json'];

export const useAutopsyReports = ({ reportAuthorId, victimId, notificationId }: { reportAuthorId?: number, victimId?: number, notificationId?: number }) => {
  return useQuery({
    queryKey: [REQUEST_PATH, reportAuthorId, victimId, notificationId],
    queryFn: async (): Promise<ResultSetAutopsyReport> => {

      // Build query string from parameters
      const searchParams = new URLSearchParams();
      if (reportAuthorId) searchParams.append('reportAuthorId', reportAuthorId + '');
      if (victimId) searchParams.append('victimId', victimId + '');
      if (notificationId) searchParams.append('notificationId', notificationId + '');

      const queryString = searchParams.toString();
      const response = await fetch(`${PATH_CRIME_AI_API}${REQUEST_PATH}` + (queryString ? `?${queryString}` : ''));

      if (response.ok) {
        const data = await response.json();
        return data as ResultSetAutopsyReport;
      }

      throw new Error('Server returned error response: ' + response.status);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!reportAuthorId || !!victimId || !!notificationId, // Only run query if at least one parameter is defined
  });
};
