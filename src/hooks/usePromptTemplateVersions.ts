
import type { paths } from '@/openapi/crimeAiSchema';
import { useQuery } from "@tanstack/react-query";
import { PATH_CRIME_AI_API } from "./constants";

const REQUEST_PATH = '/prompt-template-history'
type ResultSetPromptTemplateVersion = paths[typeof REQUEST_PATH]['get']['responses']['200']['content']['application/json'];
type QueryParams = paths[typeof REQUEST_PATH]['get']['parameters']['query'];

export const usePromptTemplateVersions = (requestParams?: QueryParams) => {
    return useQuery({
        queryKey: [REQUEST_PATH, requestParams?.name ?? ''],
        queryFn: async (): Promise<ResultSetPromptTemplateVersion> => {

            const searchParams = new URLSearchParams();
            searchParams.append('name', requestParams.name);
            const queryString = searchParams.toString();

            const response = await fetch(`${PATH_CRIME_AI_API}${REQUEST_PATH}?${queryString}`);

            if (response.ok) {
                const data = await response.json();
                return data as ResultSetPromptTemplateVersion;
            }

            throw new Error('Server returned error response: ' + response.status);
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        enabled: !!requestParams,
    });
};
