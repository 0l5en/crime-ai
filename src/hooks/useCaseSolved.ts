
import { useQuery } from '@tanstack/react-query';
import { useSolutionAttempts } from './useSolutionAttempts';

export const useCaseSolved = (caseId: string, userId?: string) => {
  const { data: successfulAttempts, isLoading, error } = useSolutionAttempts(
    caseId, 
    userId, 
    "1" // success = true
  );

  return {
    isSolved: !!(successfulAttempts?.items && successfulAttempts.items.length > 0),
    isLoading,
    error
  };
};
