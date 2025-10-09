import { paths } from '@/openapi/crimeAiSchema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PATH_CRIME_AI_API } from './constants';
import { REQUEST_PATH as crimeCasesQueryKey } from './useCrimeCases';
import { getCsrfToken } from './util';

const REQUEST_PATH = '/crimecase-vacation-rental';
type CreateCaseGeneratorFormVacationRentalDto = paths[typeof REQUEST_PATH]['post']['requestBody']['content']['application/json'];
type ValidationError = paths[typeof REQUEST_PATH]['post']['responses']['400']['content']['application/json'];

export const useCreateCrimeCaseVacationRental = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: CreateCaseGeneratorFormVacationRentalDto): Promise<{ locationUrl: string }> => {

      const response = await fetch(PATH_CRIME_AI_API + REQUEST_PATH, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': getCsrfToken()
        },
        body: JSON.stringify(formData)
      });

      // Check for validation errors (400 response with violations in response body)
      if (response.status === 400) {
        const error = new Error('invalid request') as ValidationError;
        const data = (await response.json()) as ValidationError;
        error.violations = data.violations;
        throw data;
      }

      // Check for success response (202 request was accepted)
      if (response.status === 202) {
        return { locationUrl: response.headers.get('location') };
      }

      throw new Error('Server returned error response: ' + response.status);
    },
    onSuccess: () => {
      // Invalidate and refetch crime cases list
      queryClient.invalidateQueries({ queryKey: [crimeCasesQueryKey] });
    },
  });
};