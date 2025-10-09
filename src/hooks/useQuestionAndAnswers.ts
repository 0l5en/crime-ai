
import type { paths } from '@/openapi/crimeAiSchema';
import { useQuery } from '@tanstack/react-query';
import { PATH_CRIME_AI_API } from './constants';

const REQUEST_PATH_INTERROGATION = '/interrogation';
export const REQUEST_PATH_QA = '/interrogation/{id}/question-and-answer';
type ResultSetQuestionAndAnswer = paths[typeof REQUEST_PATH_QA]['get']['responses']['200']['content']['application/json'];

export const useQuestionAndAnswers = (
  interrogationId?: string,
  referenceId?: number,
  userId?: string,
  personId?: number
) => {
  return useQuery({
    queryKey: referenceId
      ? [REQUEST_PATH_QA, 'reference', referenceId, userId, personId]
      : [REQUEST_PATH_QA, interrogationId],
    queryFn: async (): Promise<ResultSetQuestionAndAnswer> => {
      if (referenceId && userId && personId) {

        // Build query parameters for the edge function
        const queryParams = new URLSearchParams({
          referenceId: referenceId.toString(),
          userId: userId,
          personId: personId.toString()
        });

        const queryString = queryParams.toString();
        const responseInterrogations = await fetch(PATH_CRIME_AI_API + REQUEST_PATH_INTERROGATION + (queryString ? `?${queryString}` : ''));

        if (responseInterrogations.ok) {
          const interrogationsData = await responseInterrogations.json();

          // If we have interrogations, get Q&A for the first one
          if (interrogationsData?.items && interrogationsData.items.length > 0) {
            const firstInterrogation = interrogationsData.items[0];

            // Use GET request with interrogationId as path parameter
            const responseQa = await fetch(PATH_CRIME_AI_API + REQUEST_PATH_QA.replace('{id}', firstInterrogation.id));

            if (responseQa.ok) {
              const qas = await responseQa.json();
              return qas as ResultSetQuestionAndAnswer;
            }

            throw new Error('Server returned error response: ' + responseQa.status);
          }

          // No interrogations found, return empty result
          return { items: [] };
        }

        throw new Error('Server returned error response: ' + responseInterrogations.status);

      } else if (interrogationId) {

        const response = await fetch(PATH_CRIME_AI_API + REQUEST_PATH_QA.replace('{id}', interrogationId));

        if (response.ok) {
          const data = await response.json();
          return data as ResultSetQuestionAndAnswer;
        }

        throw new Error('Server returned error response: ' + response.status);
      }

      throw new Error('Either interrogationId or reference parameters (referenceId + userId + personId) must be provided');
    },
    staleTime: 30 * 1000, // 30 seconds (more frequent updates for chat-like interface)
    enabled: !!(interrogationId || (referenceId && userId && personId)), // Only run query if we have the required parameters
  });
};
