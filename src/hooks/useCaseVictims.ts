
import { usePersons } from './usePersons';

export const useCaseVictims = (caseId: string) => {
  return usePersons(caseId, 'VICTIM');
};
