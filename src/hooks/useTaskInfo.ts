
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { TaskInfoDto } from '../../supabase/functions/_shared/crime-api-types';

export const useTaskInfo = (taskId: string | null, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['taskInfo', taskId],
    queryFn: async (): Promise<TaskInfoDto> => {
      if (!taskId) {
        throw new Error('Task ID is required');
      }

      console.log('Fetching task info for ID:', taskId);
      
      const { data, error } = await supabase.functions.invoke('get-task-info', {
        body: { taskId }
      });
      
      if (error) {
        console.error('Edge function error:', error);
        throw new Error(`Failed to fetch task info: ${error.message}`);
      }
      
      console.log('Task info response:', data);
      return data as TaskInfoDto;
    },
    enabled: enabled && !!taskId,
    refetchInterval: (query) => {
      // Poll every second until task is completed or failed
      const taskData = query.state.data;
      return taskData?.status === 'COMPLETED' || taskData?.status === 'FAILED' ? false : 1000;
    },
    staleTime: 0, // Always refetch for real-time updates
  });
};
