
import { usePersons } from './usePersons';
import type { components } from '@/openapi/crimeAiSchema';

type PersonDto = components['schemas']['PersonDto'];

export const useForensicPathologist = (caseId: string) => {
  const { data: allPersons, isLoading, error } = usePersons(caseId);
  
  // Filter for forensic pathologist using roles array
  const forensicPathologist: PersonDto | null = allPersons?.items?.find(person => 
    person.roles.includes('FORENSIC_PATHOLOGIST')
  ) || null;

  return {
    data: forensicPathologist,
    isLoading,
    error,
  };
};
