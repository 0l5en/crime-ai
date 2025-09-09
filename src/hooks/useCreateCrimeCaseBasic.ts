import { supabase } from '@/integrations/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateCaseGeneratorFormBasicDto, Violations } from '../../supabase/functions/_shared/crime-api-types';

interface ValidationError extends Error {
  violations?: Violations;
}

export const useCreateCrimeCaseBasic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: CreateCaseGeneratorFormBasicDto): Promise<{ locationUrl: string }> => {
      console.log('Creating new basic crime case with form data:', formData);

      const { data, error } = await supabase.functions.invoke('create-crime-case-basic', {
        body: formData
      });

      // Check for validation errors (400 response with violations in data)
      if (error && data?.violations) {
        console.log('Validation errors from API:', data.violations);
        const validationError = new Error('Validation failed') as ValidationError;
        validationError.violations = data;
        throw validationError;
      }

      // Handle other errors (500, network issues, etc.)
      if (error) {
        console.error('Edge function error:', error);
        throw new Error(`Failed to create crime case: ${error.message}`);
      }

      console.log('Basic crime case creation response:', data);

      if (!data?.locationUrl) {
        throw new Error('No location URL returned from crime case creation');
      }

      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch crime cases list
      queryClient.invalidateQueries({ queryKey: ['crimeCases'] });
    },
  });
};