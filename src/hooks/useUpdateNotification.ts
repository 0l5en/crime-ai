import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useKeycloak } from "@/contexts/KeycloakContext";
import { NotificationDto } from "./useNotifications";

export const useUpdateNotification = () => {
  const queryClient = useQueryClient();
  const { user } = useKeycloak();

  const userId = user?.email || user?.name || '';

  return useMutation({
    mutationFn: async (notification: NotificationDto) => {
      const { data, error } = await supabase.functions.invoke("update-notification", {
        body: notification,
      });

      if (error) {
        console.error("Error updating notification:", error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch notifications
      queryClient.invalidateQueries({ queryKey: ["notifications", userId] });
    },
  });
};