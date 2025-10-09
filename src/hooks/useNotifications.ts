import { useUserContext } from "@/contexts/UserContext";
import { components, paths } from "@/openapi/crimeAiSchema";
import { useQuery } from "@tanstack/react-query";
import { PATH_CRIME_AI_API } from "./constants";

export const REQUEST_PATH = '/notification';
export type ResultSetNotification = paths[typeof REQUEST_PATH]['get']['responses']['200']['content']['application/json'];
export type NotificationDto = components['schemas']['NotificationDto'];

export const useNotifications = () => {
  const user = useUserContext();

  const userId = user?.email || user?.name || '';

  return useQuery({
    queryKey: [REQUEST_PATH, userId],
    queryFn: async (): Promise<ResultSetNotification> => {
      if (!userId) {
        throw new Error("User not authenticated");
      }

      // Build query parameters for the edge function
      const queryParams = new URLSearchParams({
        userId: userId
      });
      const queryString = queryParams.toString();
      const response = await fetch(PATH_CRIME_AI_API + REQUEST_PATH + (queryString ? `?${queryString}` : ''));

      if (response.ok) {
        const data = await response.json();
        return data as ResultSetNotification;
      }

      throw new Error('Server returned error response: ' + response.status);
    },
    enabled: user.isAuthenticated && !!userId,
    refetchInterval: 5 * 60 * 1000, // Poll every 5 minutes
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};