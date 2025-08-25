
import { usePersons } from './usePersons';
import type { components } from '@/openapi/crimeAiSchema';

type PersonDto = components['schemas']['PersonDto'];

export const useForensicPathologist = (caseId: string) => {
  const { data: forensicPathologists, isLoading, error } = usePersons(caseId, 'FORENSIC_PATHOLOGIST');
  
  // Get the first forensic pathologist (assuming there's only one)
  const forensicPathologist: PersonDto | null = forensicPathologists?.items && forensicPathologists.items.length > 0 
    ? forensicPathologists.items[0] 
    : null;

  return {
    data: forensicPathologist,
    isLoading,
    error,
  };
};
