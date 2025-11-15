import type { paths } from '@/openapi/crimeAiSchema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PATH_CRIME_AI_API } from './constants';
import { QUERY_KEY as crimeCaseGeneratorInfosQueryKey } from './useCrimeCaseGeneratorInfo';
import { REQUEST_PATH as crimeCasesQueryKey } from './useCrimeCases';
import { getCsrfToken } from './util';

const REQUEST_PATH = '/crimecase/{id}';
type CrimeCaseDto = paths[typeof REQUEST_PATH]['patch']['requestBody']['content']['application/json'];

export const useUpdateCrimeCase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ caseId, crimeCaseDto }: { caseId: string; crimeCaseDto: CrimeCaseDto }): Promise<void> => {

      const response = await fetch(PATH_CRIME_AI_API + REQUEST_PATH.replace('{id}', caseId), {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': getCsrfToken()
        },
        body: JSON.stringify(crimeCaseDto)
      });

      if (!response.ok) {
        throw new Error('Server returned error response: ' + response.status);
      }
    },
    onSuccess: () => {
      // Invalidate and refetch crime cases list
      queryClient.invalidateQueries({ queryKey: [crimeCasesQueryKey] });
      queryClient.invalidateQueries({ queryKey: [crimeCaseGeneratorInfosQueryKey] });
    },
  });
};