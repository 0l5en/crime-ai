
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface CrimeCase {
  title: string;
  description: string;
}

interface FetchCasesResponse {
  cases: CrimeCase[];
}

export const useCrimeCases = () => {
  return useQuery({
    queryKey: ['crime-cases'],
    queryFn: async (): Promise<CrimeCase[]> => {
      const { data, error } = await supabase.functions.invoke<FetchCasesResponse>('fetch-cases');
      
      if (error) {
        console.error('Error fetching crime cases:', error);
        throw new Error(error.message);
      }
      
      return data?.cases || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};
