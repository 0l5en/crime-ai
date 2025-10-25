import { useQuery } from '@tanstack/react-query';
import createClient from 'openapi-fetch';
import type { paths } from '@/openapi/crimeAiSchema';
import { getCsrfToken } from './util';

const apiBaseUrl = import.meta.env.VITE_CRIME_AI_API_BASE_URL || '';

export const useCaseSubscription = (caseId: string | undefined) => {
  const client = createClient<paths>({ baseUrl: apiBaseUrl });

  return useQuery({
    queryKey: ['caseSubscription', caseId],
    queryFn: async () => {
      if (!caseId) {
        throw new Error('Case ID is required');
      }

      const response = await client.GET('/crimecase/{id}/subscription', {
        params: {
          path: { id: caseId },
        },
        headers: {
          'X-XSRF-TOKEN': getCsrfToken(),
        },
        credentials: 'include',
      });

      if (response.error) {
        // 404 bedeutet keine Subscription vorhanden - nicht als Fehler behandeln
        if (response.response.status === 404) {
          return null;
        }
        throw new Error('Failed to fetch subscription: ' + response.response.status);
      }

      return response.data;
    },
    enabled: !!caseId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
