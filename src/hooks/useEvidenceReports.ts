
import type { paths } from '@/openapi/crimeAiSchema';
import { useQuery } from '@tanstack/react-query';
import { PATH_CRIME_AI_API } from './constants';

const REQUEST_PATH = '/evidence-report';
type ResultSetEvidenceReport = paths[typeof REQUEST_PATH]['get']['responses']['200']['content']['application/json'];

export const useEvidenceReports = (evidenceId: string, personId?: string) => {
  return useQuery({
    queryKey: [REQUEST_PATH, evidenceId, personId],
    queryFn: async (): Promise<ResultSetEvidenceReport> => {

      const searchParams = new URLSearchParams();
      if (evidenceId) searchParams.append('evidenceId', evidenceId);
      if (personId) searchParams.append('personId', personId);

      const queryString = searchParams.toString();
      const response = await fetch(PATH_CRIME_AI_API + REQUEST_PATH + (queryString ? `?${queryString}` : ''));

      if (response.ok) {
        const data = await response.json();
        return data as ResultSetEvidenceReport;
      }

      throw new Error('Server returned error response: ' + response.status);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!evidenceId, // Only run query if evidenceId is provided
  });
};
