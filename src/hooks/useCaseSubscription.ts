import type { paths } from '@/openapi/crimeAiSchema';
import { useQuery } from '@tanstack/react-query';
import createClient from 'openapi-fetch';
import { PATH_CRIME_AI_API } from './constants';

export const useCaseSubscription = (caseId: string | undefined) => {
  const client = createClient<paths>({ baseUrl: PATH_CRIME_AI_API });

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
      });

      if (response.error) {
        // 404 no Subscription available
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
