import { useUserContext } from "@/contexts/UserContext";
import { components, paths } from "@/openapi/crimeAiSchema";
import { useQuery } from "@tanstack/react-query";
import { PATH_CRIME_AI_API } from "./constants";

export const REQUEST_PATH = '/crimecase-generation-attempt-my';
export type ResultSetCaseGenerationAttempt = paths[typeof REQUEST_PATH]['get']['responses']['200']['content']['application/json'];
export type CaseGenerationAttemptDto = components['schemas']['CrimeCaseGenerationAttemptDto'];

export const useMyCaseGenerationAttempts = () => {
  const user = useUserContext();
  const userId = user?.email || user?.name || '';

  return useQuery({
    queryKey: [REQUEST_PATH, userId],
    queryFn: async (): Promise<ResultSetCaseGenerationAttempt> => {
      if (!userId) {
        throw new Error("User not authenticated");
      }

      const response = await fetch(PATH_CRIME_AI_API + REQUEST_PATH);

      if (response.ok) {
        const data = await response.json();
        return data as ResultSetCaseGenerationAttempt;
      }

      throw new Error('Server returned error response: ' + response.status);
    },
    enabled: user.isAuthenticated && !!userId,
    refetchInterval: 5000, // Poll alle 5 Sekunden
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};
