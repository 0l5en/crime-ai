import { paths } from '@/openapi/crimeAiSchema';
import { useQuery } from '@tanstack/react-query';
import { PATH_CRIME_AI_API } from './constants';

const REQUEST_PATH = '/task/{id}';
type TaskInfo = paths[typeof REQUEST_PATH]['get']['responses']['200']['content']['application/json'];
type PathParams = paths[typeof REQUEST_PATH]['get']['parameters']['path'];

export const useTaskInfo = (requestParams?: PathParams) => {
  return useQuery({
    queryKey: [REQUEST_PATH, requestParams?.id ?? ''],
    queryFn: async (): Promise<TaskInfo> => {

      const response = await fetch(PATH_CRIME_AI_API + REQUEST_PATH.replace('{id}', requestParams.id));

      if (response.ok) {
        const data = await response.json();
        return data as TaskInfo;
      }

      throw new Error('Server returned error response: ' + response.status);
    },
    enabled: !!requestParams,
    refetchInterval: (query) => {
      // Poll every second until task is completed or failed
      const taskData = query.state.data;
      const currentStatus = taskData?.taskStatus;
      return currentStatus === 'COMPLETED' ? false : 1000;
    },
    staleTime: 0, // Always refetch for real-time updates
  });
};
