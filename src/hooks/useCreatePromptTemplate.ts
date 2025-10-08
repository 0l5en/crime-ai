import type { paths } from '@/openapi/crimeAiSchema';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PATH_CRIME_AI_API } from './constants';
import { REQUEST_PATH as promptTemplateIdentifiersQueryKey } from './usePromptTemplateIdentifiers';
import { REQUEST_PATH as promptTemplateVersionsQueryKey } from './usePromptTemplateVersions';
import { getCsrfToken } from './util';

// Import types from the OpenAPI schema
const REQUEST_PATH = '/prompt-template';
type RequestBody = paths[typeof REQUEST_PATH]['post']['requestBody']['content']['application/json'];

export const useCreatePromptTemplate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: RequestBody) => {
            const response = await fetch(PATH_CRIME_AI_API + REQUEST_PATH, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': getCsrfToken()
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                return;
            }

            throw new Error('Server returned error response: ' + response.status);
        },
        onSuccess: (_, requestBody) => {
            // Invalidate related queries to refresh the UI
            queryClient.invalidateQueries({ queryKey: [promptTemplateIdentifiersQueryKey] });
            queryClient.invalidateQueries({ queryKey: [promptTemplateVersionsQueryKey, requestBody.name] });
        }
    });
};