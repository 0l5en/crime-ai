
import { useQuery } from "@tanstack/react-query";
import { useCrimeAiApiClient } from "@/openapi/CrimeAiApiClientHook";

const CRIME_AI_API_BASE_URL = "https://crime-ai.0l5en.de";
const CRIME_AI_API_TOKEN = "your-api-token"; // This should come from environment

export const usePromptTemplateIdentifiers = () => {
  const { crimeAiApiClient } = useCrimeAiApiClient({
    baseUrl: CRIME_AI_API_BASE_URL,
    apiToken: CRIME_AI_API_TOKEN,
  });

  return useQuery({
    queryKey: ["promptTemplateIdentifiers"],
    queryFn: () => crimeAiApiClient.GET("/prompt-template-identifier"),
  });
};

export const usePromptTemplateVersions = (templateName: string) => {
  const { crimeAiApiClient } = useCrimeAiApiClient({
    baseUrl: CRIME_AI_API_BASE_URL,
    apiToken: CRIME_AI_API_TOKEN,
  });

  return useQuery({
    queryKey: ["promptTemplateVersions", templateName],
    queryFn: () => crimeAiApiClient.GET("/prompt-template-history", {
      params: {
        query: { name: templateName }
      }
    }),
    enabled: !!templateName,
  });
};

export const usePromptTemplate = (templateId: string) => {
  const { crimeAiApiClient } = useCrimeAiApiClient({
    baseUrl: CRIME_AI_API_BASE_URL,
    apiToken: CRIME_AI_API_TOKEN,
  });

  return useQuery({
    queryKey: ["promptTemplate", templateId],
    queryFn: () => crimeAiApiClient.GET("/prompt-template/{id}", {
      params: {
        path: { id: templateId }
      }
    }),
    enabled: !!templateId,
  });
};
