import { useUserContext } from "@/contexts/UserContext";
import { paths } from "@/openapi/crimeAiSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PATH_CRIME_AI_API } from "./constants";
import { REQUEST_PATH as NotificationQueryKey } from './useNotifications';
import { getCsrfToken } from "./util";

const REQUEST_PATH = '/notification';
type NotificationDto = paths[typeof REQUEST_PATH]['patch']['requestBody']['content']['application/json'];

export const useUpdateNotification = () => {
  const queryClient = useQueryClient();
  const user = useUserContext();

  const userId = user?.email || user?.name || '';

  return useMutation({
    mutationFn: async (notification: NotificationDto) => {

      const response = await fetch(PATH_CRIME_AI_API + REQUEST_PATH, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': getCsrfToken()
        },
        body: JSON.stringify(notification)
      });

      if (!response.ok) {
        throw new Error('Server returned error response: ' + response.status);
      }
    },
    onSuccess: () => {
      // Invalidate and refetch notifications
      queryClient.invalidateQueries({ queryKey: [NotificationQueryKey, userId] });
    },
  });
};