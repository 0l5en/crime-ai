
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { components } from "@/openapi/crimeAiSchema";

type ResultSetPromptTemplateIdentifier = components['schemas']['ResultSetPromptTemplateIdentifier'];
type ResultSetPromptTemplateVersion = components['schemas']['ResultSetPromptTemplateVersion'];
type PromptTemplateDto = components['schemas']['PromptTemplateDto'];

const CRIME_AI_API_BASE_URL = "https://crime-ai.0l5en.de";
const CRIME_AI_API_TOKEN = "your-api-token"; // This should come from environment

export const usePromptTemplateIdentifiers = () => {
  return useQuery({
    queryKey: ["promptTemplateIdentifiers"],
    queryFn: async (): Promise<ResultSetPromptTemplateIdentifier> => {
      const { data } = await supabase.functions.invoke('prompt-template-identifiers');
      return data;
    },
  });
};

export const usePromptTemplateVersions = (templateName: string) => {
  return useQuery({
    queryKey: ["promptTemplateVersions", templateName],
    queryFn: async (): Promise<ResultSetPromptTemplateVersion> => {
      const { data } = await supabase.functions.invoke('prompt-template-versions', {
        body: { name: templateName }
      });
      return data;
    },
    enabled: !!templateName,
  });
};

export const usePromptTemplate = (templateId: string) => {
  return useQuery({
    queryKey: ["promptTemplate", templateId],
    queryFn: async (): Promise<PromptTemplateDto> => {
      const { data } = await supabase.functions.invoke('prompt-template', {
        body: { id: templateId }
      });
      return data;
    },
    enabled: !!templateId,
  });
};
