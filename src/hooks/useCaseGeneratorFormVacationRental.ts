import { components, paths } from "@/openapi/crimeAiSchema";
import { useQuery } from "@tanstack/react-query";
import createClient from "openapi-fetch";
import { PATH_CRIME_AI_API } from "./constants";

export const REQUEST_PATH = '/crimecase-generation-attempt-my';
export type ResultSetCaseGenerationAttempt = paths[typeof REQUEST_PATH]['get']['responses']['200']['content']['application/json'];
export type CaseGenerationAttemptDto = components['schemas']['CrimeCaseGenerationAttemptDto'];
type ResultSetCaseGeneratorFormVacationRentalDto = components['schemas']['ResultSetCaseGeneratorFormVacationRentalDto'];

export const useCaseGeneratorFormVacationRental = () => {
  const client = createClient<paths>({ baseUrl: PATH_CRIME_AI_API });

  return useQuery({
    queryKey: ['caseGeneratorFormVacationRental'],
    queryFn: async (): Promise<ResultSetCaseGeneratorFormVacationRentalDto> => {

      const result = await client.GET('/crimecase-generator-vacation-rental');

      if (result.error) {
        throw new Error('Server returned error response: ' + result.response.status);
      }

      return result.data;
    },
    refetchInterval: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};
