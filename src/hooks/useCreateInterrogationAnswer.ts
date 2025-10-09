import type { paths } from '@/openapi/crimeAiSchema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PATH_CRIME_AI_API } from './constants';
import { REQUEST_PATH as InterrogationsQueryKey } from './useInterrogations';
import { REQUEST_PATH_QA as QuestionAndAnswerQueryKey } from './useQuestionAndAnswers';
import { getCsrfToken } from './util';

const REQUEST_PATH = '/interrogation';
type CreateInterrogationAnswerDto = paths[typeof REQUEST_PATH]['post']['requestBody']['content']['application/json'];

export const useCreateInterrogationAnswer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateInterrogationAnswerDto): Promise<string> => {

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
    onSuccess: (_, variables) => {
      // Invalidate related queries to refresh data
      queryClient.invalidateQueries({
        queryKey: [InterrogationsQueryKey, variables.userId, variables.personId]
      });
      queryClient.invalidateQueries({
        queryKey: [QuestionAndAnswerQueryKey]
      });
      // Invalidate evidence report specific queries if reference is used
      if (variables.reference) {
        queryClient.invalidateQueries({
          queryKey: [QuestionAndAnswerQueryKey, 'reference', variables.reference.referenceId]
        });
      }
    },
  });
};
