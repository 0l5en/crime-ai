
import type { components } from '@/openapi/crimeAiSchema';
import { usePersons } from './usePersons';

type PersonDto = components['schemas']['PersonDto'];

export const useForensicPathologist = (caseId: string) => {
  const { data: forensicPathologists, isLoading, error } = usePersons(caseId, 'FORENSIC_PATHOLOGIST');

  // Filter for first forensic pathologist
  const forensicPathologist: PersonDto | null = forensicPathologists?.items?.length > 0 ? forensicPathologists.items[0] : null;

  return {
    data: forensicPathologist,
    isLoading,
    error,
  };
};
