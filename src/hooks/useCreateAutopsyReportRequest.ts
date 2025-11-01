import { paths } from "@/openapi/crimeAiSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { PATH_CRIME_AI_API } from "./constants";
import { REQUEST_PATH as autopsyReportRequestQueryKey } from './useAutopsyReportRequests';
import { getCsrfToken } from "./util";

const REQUEST_PATH = '/autopsy-report-request';
type CreateAutopsyReportRequestDto = paths[typeof REQUEST_PATH]['post']['requestBody']['content']['application/json'];

export const useCreateAutopsyReportRequest = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation('createAutopsyReportRequest');

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
      queryClient.invalidateQueries({ queryKey: [autopsyReportRequestQueryKey] });
      toast.success(t('requestSubmitted'));
    },
    onError: (error) => {
      toast.error(t('requestFailed'));
    },
  });
};