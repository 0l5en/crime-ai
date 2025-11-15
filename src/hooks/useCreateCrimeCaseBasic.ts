import { paths } from '@/openapi/crimeAiSchema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PATH_CRIME_AI_API } from './constants';
import { REQUEST_PATH as crimeCasesQueryKey } from './useCrimeCasesBasic';
import { getCsrfToken } from './util';

// Import types from the OpenAPI schema
const REQUEST_PATH = '/crimecase-basic';
export type RequestBody = paths[typeof REQUEST_PATH]['post']['requestBody']['content']['application/json'];
export type ValidationError = paths[typeof REQUEST_PATH]['post']['responses']['400']['content']['application/json'];

export const useCreateCrimeCaseBasic = () => {
  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: async (data: RequestBody): Promise<{ locationUrl: string }> => {

      const response = await fetch(PATH_CRIME_AI_API + REQUEST_PATH, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': getCsrfToken()
        },
        body: JSON.stringify(data)
      });

      // Check for validation errors (400 response with violations in response body)
      if (response.status === 400) {
        const error = new Error('invalid request') as ValidationError;
        const data = (await response.json()) as ValidationError;
        error.violations = data.violations;
        throw data;
      }

      // Check for success response
      if (response.ok) {
        return;
      }

      throw new Error('Server returned error response: ' + response.status);
    },
    onSuccess: () => {
      // Invalidate and refetch crime cases list
      queryClient.invalidateQueries({ queryKey: [crimeCasesQueryKey] });
    },
  });
};