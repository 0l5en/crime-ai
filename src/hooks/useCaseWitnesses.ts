
import { usePersons } from './usePersons';

export const useCaseWitnesses = (caseId: string) => {
  return usePersons(caseId, 'WITNESS');
};
