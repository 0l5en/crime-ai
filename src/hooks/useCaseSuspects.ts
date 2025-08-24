
import { usePersons } from './usePersons';

export const useCaseSuspects = (caseId: string) => {
  return usePersons(caseId, 'SUSPECT');
};
