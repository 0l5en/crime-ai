import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PATH_CRIME_AI_API } from './constants';
import { REQUEST_PATH as crimeCasesBasicQueryKey } from './useCrimeCasesBasic';
import { REQUEST_PATH as crimeCasesVacationRentalQueryKey } from './useCrimeCasesVacationRental';
import { getCsrfToken } from './util';

const REQUEST_PATH = '/crimecase/{id}';

export const useDeleteCrimeCase = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ caseId }: { caseId: string }): Promise<void> => {

      const response = await fetch(PATH_CRIME_AI_API + REQUEST_PATH.replace('{id}', caseId), {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': getCsrfToken()
        }
      });

      if (!response.ok) {
        throw new Error('Server returned error response: ' + response.status);
      }
    },
    onSuccess: () => {
      // Invalidate and refetch crime cases list
      queryClient.invalidateQueries({ queryKey: [crimeCasesBasicQueryKey] });
      queryClient.invalidateQueries({ queryKey: [crimeCasesVacationRentalQueryKey] });
    },
  });
};