
import { supabase } from "@/integrations/supabase/client";
import type { components } from '@/openapi/crimeAiSchema';
import { useQuery } from "@tanstack/react-query";

// Import types from the shared crime-api-types
type ResultSetPromptTemplateIdentifier = components['schemas']['ResultSetPromptTemplateIdentifier'];
type ResultSetPromptTemplateVersion = components['schemas']['ResultSetPromptTemplateVersion'];
type PromptTemplateDto = components['schemas']['PromptTemplateDto'];

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

export const usePromptTemplate = (templateId: string) => {
  return useQuery({
    queryKey: ["promptTemplate", templateId],
    queryFn: async (): Promise<PromptTemplateDto> => {
      console.log('Fetching prompt template for ID:', templateId);
      const { data, error } = await supabase.functions.invoke(`prompt-template/${templateId}`, {
        method: 'GET',
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
