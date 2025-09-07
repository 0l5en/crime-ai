import { useKeycloak } from "@/contexts/KeycloakContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

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

      // Build query parameters for the edge function
      const queryParams = new URLSearchParams({
        userId: userId
      });

      const functionNameWithParams = `list-notifications?${queryParams.toString()}`;

      const { data, error } = await supabase.functions.invoke(functionNameWithParams, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
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