
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Extended interface to handle both possible status property names
interface TaskInfoResponse {
  id: string;
  status?: "PENDING" | "RUNNING" | "COMPLETED" | "FAILED";
  taskStatus?: "PENDING" | "RUNNING" | "COMPLETED" | "FAILED";
  createdAt: string;
  updatedAt?: string;
  result?: any;
  error?: string;
}

export const useTaskInfo = (taskId: string | null, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['taskInfo', taskId],
    queryFn: async (): Promise<TaskInfoResponse> => {
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
      return data as TaskInfoResponse;
    },
    enabled: enabled && !!taskId,
    refetchInterval: (query) => {
      // Poll every second until task is completed or failed
      const taskData = query.state.data;
      const currentStatus = taskData?.status || taskData?.taskStatus;
      return currentStatus === 'COMPLETED' || currentStatus === 'FAILED' ? false : 1000;
    },
    staleTime: 0, // Always refetch for real-time updates
  });
};
