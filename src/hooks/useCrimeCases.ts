
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Enhanced types based on OpenAPI parsing
interface CrimeCase {
  title: string;
  description: string;
  imageUrl?: string;
}

interface ApiMetadata {
  apiVersion: string;
  endpointUsed: string;
  totalEndpoints: number;
}

interface FetchCasesResponse {
  cases: CrimeCase[];
  metadata?: ApiMetadata;
}

interface CrimeCasesError {
  message: string;
  code?: string;
  apiError?: boolean;
}

export const useCrimeCases = () => {
  return useQuery({
    queryKey: ['crime-cases'],
    queryFn: async (): Promise<CrimeCase[]> => {
      try {
        const { data, error } = await supabase.functions.invoke<FetchCasesResponse>('fetch-cases');
        
        if (error) {
          console.error('Supabase function error:', error);
          throw new Error(`API Error: ${error.message}`);
        }
        
        if (!data) {
          throw new Error('No data received from API');
        }

        // Validate response structure
        if (!data.cases || !Array.isArray(data.cases)) {
          console.error('Invalid response structure:', data);
          throw new Error('Invalid API response format');
        }

        // Log API metadata for debugging
        if (data.metadata) {
          console.log('API Metadata:', data.metadata);
        }

        // Validate each case has required fields
        const validatedCases = data.cases.map((crimeCase, index) => {
          if (!crimeCase.title) {
            console.warn(`Case ${index} missing title, using fallback`);
          }
          if (!crimeCase.description) {
            console.warn(`Case ${index} missing description, using fallback`);
          }

          return {
            title: crimeCase.title || 'Untitled Case',
            description: crimeCase.description || 'No description available',
            imageUrl: crimeCase.imageUrl
          };
        });

        console.log(`Successfully loaded ${validatedCases.length} crime cases`);
        return validatedCases;
        
      } catch (error) {
        console.error('Error fetching crime cases:', error);
        
        // Enhanced error handling with specific error types
        if (error instanceof Error) {
          if (error.message.includes('API Error')) {
            throw new Error(`External API Error: ${error.message}`);
          } else if (error.message.includes('Invalid API response')) {
            throw new Error('API returned unexpected data format');
          } else if (error.message.includes('No data received')) {
            throw new Error('API returned empty response');
          }
        }
        
        throw new Error(`Failed to load crime cases: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      // Don't retry on validation errors, only on network/API errors
      if (error instanceof Error && error.message.includes('Invalid API response')) {
        return false;
      }
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Type guard for runtime type checking
export function isCrimeCase(obj: any): obj is CrimeCase {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.title === 'string' &&
    typeof obj.description === 'string' &&
    (obj.imageUrl === undefined || typeof obj.imageUrl === 'string')
  );
}

// Hook for API metadata (optional)
export const useCrimeCasesMetadata = () => {
  return useQuery({
    queryKey: ['crime-cases-metadata'],
    queryFn: async (): Promise<ApiMetadata | null> => {
      try {
        const { data } = await supabase.functions.invoke<FetchCasesResponse>('fetch-cases');
        return data?.metadata || null;
      } catch (error) {
        console.error('Error fetching API metadata:', error);
        return null;
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: false, // Don't retry metadata requests
  });
};
