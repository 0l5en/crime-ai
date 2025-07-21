
import { supabase } from "@/integrations/supabase/client";
import type { components } from '@/openapi/crimeAiSchema';
import { useQuery } from "@tanstack/react-query";

// Import types from the shared crime-api-types
type PromptTemplateDto = components['schemas']['PromptTemplateDto'];

export const usePromptTemplate = (templateId: string) => {
    return useQuery({
        queryKey: ["promptTemplate", templateId],
        queryFn: async (): Promise<PromptTemplateDto> => {
            console.log('Fetching prompt template for ID:', templateId);
            const { data, error } = await supabase.functions.invoke(`prompt-template/${templateId}`, {
                body: { id: templateId }
            });

            if (error) {
                console.error('Error fetching prompt template:', error);
                throw error;
            }

            console.log('Received prompt template:', data);
            return data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        enabled: !!templateId,
    });
};
