import { supabase } from "@/integrations/supabase/client";
import type { components } from '@/openapi/crimeAiSchema';
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Import types from the OpenAPI schema
type CreatePromptTemplateDto = components['schemas']['CreatePromptTemplateDto'];

export const useCreatePromptTemplate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreatePromptTemplateDto) => {
            console.log('Creating prompt template:', data);
            const { data: result, error } = await supabase.functions.invoke('create-prompt-template', {
                body: data
            });

            if (error) {
                console.error('Error creating prompt template:', error);
                throw error;
            }

            console.log('Prompt template created successfully:', result);
            return result;
        },
        onSuccess: (_, variables) => {
            // Invalidate related queries to refresh the UI
            queryClient.invalidateQueries({ queryKey: ["promptTemplateIdentifiers"] });
            queryClient.invalidateQueries({ queryKey: ["promptTemplateVersions", variables.name] });
            console.log('Queries invalidated after successful template creation');
        },
        onError: (error) => {
            console.error('Failed to create prompt template:', error);
        }
    });
};