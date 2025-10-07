import type { paths } from '@/openapi/crimeAiSchema';
import { useQuery } from "@tanstack/react-query";
import { PATH_CRIME_AI_API } from './constants';

// Import types from the shared crime-api-types
const REQUEST_PATH = '/prompt-template/{id}';
type PromptTemplateDto = paths[typeof REQUEST_PATH]['get']['responses']['200']['content']['application/json'];
type PathParams = paths[typeof REQUEST_PATH]['get']['parameters']['path'];

export const usePromptTemplate = (requestParams?: PathParams) => {
    return useQuery({
        queryKey: [REQUEST_PATH, requestParams?.id ?? ''],
        queryFn: async (): Promise<PromptTemplateDto> => {

            const response = await fetch(PATH_CRIME_AI_API + REQUEST_PATH.replace('{id}', requestParams.id));

            if (response.ok) {
                const data = await response.json();
                return data as PromptTemplateDto;
            }

            throw new Error('Server returned error response: ' + response.status);
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        enabled: !!requestParams,
    });
};
