
import { supabase } from "@/integrations/supabase/client";
import type { components } from '@/openapi/crimeAiSchema';
import { useQuery } from "@tanstack/react-query";

// Import types from the shared crime-api-types
type ResultSetPromptTemplateIdentifier = components['schemas']['ResultSetPromptTemplateIdentifier'];

export const usePromptTemplateIdentifiers = () => {
    return useQuery({
        queryKey: ["promptTemplateIdentifiers"],
        queryFn: async (): Promise<ResultSetPromptTemplateIdentifier> => {
            console.log('Fetching prompt template identifiers');
            const { data, error } = await supabase.functions.invoke('prompt-template-identifiers');

            if (error) {
                console.error('Error fetching prompt template identifiers:', error);
                throw error;
            }

            console.log('Received prompt template identifiers:', data);
            return data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};
