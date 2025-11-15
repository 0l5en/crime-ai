
import { useSolutionAttempts } from './useSolutionAttempts';

export const useCaseSolved = (caseId: string) => {
  const { data: successfulAttempts, isLoading, error } = useSolutionAttempts(
    caseId,
    "1" // success = true
  );

  return {
    isSolved: !!(successfulAttempts?.items && successfulAttempts.items.length > 0),
    isLoading,
    error
  };
};
