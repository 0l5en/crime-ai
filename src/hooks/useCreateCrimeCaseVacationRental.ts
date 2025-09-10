import { supabase } from '@/integrations/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateCaseGeneratorFormVacationRentalDto, Violations } from '../../supabase/functions/_shared/crime-api-types';

interface ValidationError extends Error {
  context?: Violations;
}

export const useCreateCrimeCaseVacationRental = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: CreateCaseGeneratorFormVacationRentalDto): Promise<{ locationUrl: string }> => {
      console.log('Creating new vacation rental crime case with form data:', formData);

      const { error, data } = await supabase.functions.invoke('create-crime-case-vacation-rental', {
        body: formData
      });

      // Check for validation errors (400 response with violations in error.context)
      if (error && error.context) {
        const errorContext = await error.context.json();
        if (errorContext.violations) {
          console.log('Validation errors from API:', errorContext.violations);
          const validationError = new Error('Validation failed') as ValidationError;
          validationError.context = errorContext;
          throw validationError;
        }
      }

      // Handle other errors (500, network issues, etc.)
      if (error) {
        console.error('Edge function error:', error);
        throw new Error(`Failed to create vacation rental crime case: ${error.message}`);
      }

      console.log('Vacation rental crime case creation response:', data);

      if (!data?.locationUrl) {
        throw new Error('No location URL returned from vacation rental crime case creation');
      }

      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch crime cases list
      queryClient.invalidateQueries({ queryKey: ['crimeCases'] });
    },
  });
};