import type { paths } from '@/openapi/crimeAiSchema';
import { useQuery } from '@tanstack/react-query';
import { PATH_CRIME_AI_API } from './constants';

const PATH_ME = '/me'
type UserInfoDto = paths[typeof PATH_ME]['get']['responses']['200']['content']['application/json'];

const useMe = () => {
    return useQuery({
        queryKey: [PATH_ME],
        queryFn: async (): Promise<UserInfoDto> => {
            const response = await fetch(`${PATH_CRIME_AI_API}${PATH_ME}`);
            if (response.ok) {
                const data = await response.json();
                return data as UserInfoDto;
            }

            throw new Error('Server returned error response: ' + response.status);
        },
    });
}

export default useMe;