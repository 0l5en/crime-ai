import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface CreateAutopsyReportRequestDto {
  userId: string;
  victimId: number;
}

export const useCreateAutopsyReportRequest = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (requestData: CreateAutopsyReportRequestDto) => {
      const { data, error } = await supabase.functions.invoke("create-autopsy-report-request", {
        body: requestData,
      });

      if (error) {
        console.error("Error creating autopsy report request:", error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      toast({
        title: "Request submitted",
        description: "Your autopsy report request has been submitted successfully.",
      });
    },
    onError: (error) => {
      console.error("Failed to create autopsy report request:", error);
      toast({
        title: "Request failed",
        description: "Failed to submit autopsy report request. Please try again.",
      });
    },
  });
};