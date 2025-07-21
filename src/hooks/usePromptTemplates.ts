
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Import types from the shared crime-api-types
type ResultSetPromptTemplateIdentifier = {
  items?: Array<{
    id: number;
    name: string;
  }>;
};

type ResultSetPromptTemplateVersion = {
  items?: Array<{
    id: number;
    createdAt: string;
  }>;
};

type PromptTemplateDto = {
  id: number;
  name: string;
  template: string;
  createdAt: string;
};

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
    enabled: !!templateName,
  });
};

export const usePromptTemplate = (templateId: string) => {
  return useQuery({
    queryKey: ["promptTemplate", templateId],
    queryFn: async (): Promise<PromptTemplateDto> => {
      console.log('Fetching prompt template for ID:', templateId);
      const { data, error } = await supabase.functions.invoke('prompt-template', {
        body: { id: templateId }
      });
      
      if (error) {
        console.error('Error fetching prompt template:', error);
        throw error;
      }
      
      console.log('Received prompt template:', data);
      return data;
    },
    enabled: !!templateId,
  });
};
