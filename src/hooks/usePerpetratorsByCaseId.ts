import { usePersons } from './usePersons';

export const usePerpetratorsByCaseId = (caseId: string) => {
  return usePersons(caseId, 'PERPETRATOR');
};
