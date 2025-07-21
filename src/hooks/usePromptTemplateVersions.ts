
import { supabase } from "@/integrations/supabase/client";
import type { components } from '@/openapi/crimeAiSchema';
import { useQuery } from "@tanstack/react-query";

// Import types from the shared crime-api-types
type ResultSetPromptTemplateVersion = components['schemas']['ResultSetPromptTemplateVersion'];

export const usePromptTemplateVersions = (templateName: string) => {
    return useQuery({
        queryKey: ["promptTemplateVersions", templateName],
        queryFn: async (): Promise<ResultSetPromptTemplateVersion> => {
            console.log('Fetching prompt template versions for:', templateName);
            const { data, error } = await supabase.functions.invoke('prompt-template-versions', {
                body: { name: templateName }
            });

            if (error) {
                console.error('Error fetching prompt template versions:', error);
                throw error;
            }

            console.log('Received prompt template versions:', data);
            return data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        enabled: !!templateName,
    });
};
