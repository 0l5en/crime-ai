import type { paths } from '@/openapi/crimeAiSchema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PATH_CRIME_AI_API } from './constants';
import { REQUEST_PATH as solutionAttemptsQueryKey } from './useSolutionAttempts';
import { getCsrfToken } from './util';

const REQUEST_PATH = '/crimecase/{id}/solution-attempt';
type CreateSolutionAttemptDto = paths[typeof REQUEST_PATH]['post']['requestBody']['content']['application/json'];

export const useCreateSolutionAttempt = (caseId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateSolutionAttemptDto): Promise<string> => {

      const response = await fetch(PATH_CRIME_AI_API + REQUEST_PATH.replace('{id}', caseId), {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': getCsrfToken()
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        return '';
      }

      throw new Error('Server returned error response: ' + response.status);
    },
    onSuccess: () => {
      // Invalidate related queries to refresh data
      queryClient.invalidateQueries({
        queryKey: [solutionAttemptsQueryKey, caseId]
      });
    },
  });
};
