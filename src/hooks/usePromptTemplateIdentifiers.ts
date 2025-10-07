
import type { paths } from '@/openapi/crimeAiSchema';
import { useQuery } from "@tanstack/react-query";
import { PATH_CRIME_AI_API } from "./constants";

const REQUEST_PATH = '/prompt-template-identifier'
type ResultSetPromptTemplateIdentifier = paths[typeof REQUEST_PATH]['get']['responses']['200']['content']['application/json'];

export const usePromptTemplateIdentifiers = () => {
    return useQuery({
        queryKey: [REQUEST_PATH],
        queryFn: async (): Promise<ResultSetPromptTemplateIdentifier> => {

            const response = await fetch(`${PATH_CRIME_AI_API}${REQUEST_PATH}`);

            if (response.ok) {
                const data = await response.json();
                return data as ResultSetPromptTemplateIdentifier;
            }

            throw new Error('Server returned error response: ' + response.status);
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};
