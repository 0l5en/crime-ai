import type { paths } from '@/openapi/crimeAiSchema';
import { useQuery } from '@tanstack/react-query';
import createClient from 'openapi-fetch';
import { PATH_CRIME_AI_API } from './constants';

export const QUERY_KEY = 'crimeCaseGeneratorInfos';

export const useCrimeCaseGeneratorInfos = ({ firstResult = 0, maxResults = 10 }: { firstResult?: number; maxResults?: number }) => {
    const client = createClient<paths>({ baseUrl: PATH_CRIME_AI_API });

    return useQuery({
        queryKey: [QUERY_KEY],
        queryFn: async () => {
            const response = await client.GET('/crimecase-generator-info', {
                params: {
                    query: {
                        firstResult: firstResult + '',
                        maxResults: maxResults + ''
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
