import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
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
    onError: (error: any) => {
      // Handle validation errors from server
      if (error?.violations) {
        console.log('Server validation errors:', error.violations);
        // The error will be handled by the component
        const validationError = new Error('Validation failed') as ValidationError;
        validationError.violations = error.violations;
        throw validationError;
      }
    },
  });
};