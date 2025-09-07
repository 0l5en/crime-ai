import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useKeycloak } from "@/contexts/KeycloakContext";

export interface NotificationDto {
  id: number;
  notificationContextType: "AUTOPSY_REPORT";
  recipientId: string;
  nameOfSender: string;
  subject: string;
  read: boolean;
  createdAt: string;
}

export interface ResultSetNotification {
  items?: NotificationDto[];
}

export const useNotifications = () => {
  const { user, authenticated } = useKeycloak();

  const userId = user?.email || user?.name || '';

  return useQuery({
    queryKey: ["notifications", userId],
    queryFn: async (): Promise<ResultSetNotification> => {
      if (!userId) {
        throw new Error("User not authenticated");
      }

      const { data, error } = await supabase.functions.invoke("list-notifications", {
        body: { userId },
      });

      if (error) {
        console.error("Error fetching notifications:", error);
        throw error;
      }

      return data;
    },
    enabled: authenticated && !!userId,
    refetchInterval: 5 * 60 * 1000, // Poll every 5 minutes
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};