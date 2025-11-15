import type { paths } from '@/openapi/crimeAiSchema';
import { useQuery } from '@tanstack/react-query';
import createClient from 'openapi-fetch';
import { PATH_CRIME_AI_API } from './constants';

export const QUERY_KEY = 'crimeCaseGeneratorInfos';

export const useCrimeCaseGeneratorInfo = (filter: { firstResult?: number; maxResults?: number }) => {
    const client = createClient<paths>({ baseUrl: PATH_CRIME_AI_API });

    return useQuery({
        queryKey: [QUERY_KEY, filter],
        queryFn: async () => {
            const response = await client.GET('/crimecase-generator-info', {
                params: {
                    query: {
                        firstResult: filter.firstResult + '',
                        maxResults: filter.maxResults + ''
                    }
                }
            });

            if (response.error) {
                throw new Error('Failed to fetch crimeCaseGeneratorInfos: ' + response.response.status);
            }

            return response.data;
        },
        refetchInterval: 60 * 1000, // 1 minute
    });
};
