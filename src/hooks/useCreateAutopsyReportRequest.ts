import { useToast } from "@/hooks/use-toast";
import { paths } from "@/openapi/crimeAiSchema";
import { useMutation } from "@tanstack/react-query";
import { PATH_CRIME_AI_API } from "./constants";
import { getCsrfToken } from "./util";

const REQUEST_PATH = '/autopsy-report-request';
type CreateAutopsyReportRequestDto = paths[typeof REQUEST_PATH]['post']['requestBody']['content']['application/json'];

export const useCreateAutopsyReportRequest = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (requestData: CreateAutopsyReportRequestDto) => {

      const response = await fetch(PATH_CRIME_AI_API + REQUEST_PATH, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': getCsrfToken()
        },
        body: JSON.stringify(requestData)
      });

      if (response.ok) {
        return;
      }

      throw new Error('Server returned error response: ' + response.status);
    },
    onSuccess: () => {
      toast({
        title: "Request submitted",
        description: "Your autopsy report request has been submitted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Request failed",
        description: "Failed to submit autopsy report request. Please try again.",
      });
    },
  });
};