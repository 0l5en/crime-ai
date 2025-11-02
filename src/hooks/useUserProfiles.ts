import type { components, paths } from '@/openapi/crimeAiSchema';
import { useQuery } from '@tanstack/react-query';
import createClient from 'openapi-fetch';
import { PATH_CRIME_AI_API } from './constants';
import { getCsrfToken } from './util';

type UserProfileFilterDto = components['schemas']['UserProfileFilterDto'];

export const useUserProfiles = (userProfileFilterDto: UserProfileFilterDto | undefined) => {
    const client = createClient<paths>({ baseUrl: PATH_CRIME_AI_API });

    return useQuery({
        queryKey: ['userProfiles', userProfileFilterDto],
        queryFn: async () => {
            if (!userProfileFilterDto) {
                throw new Error('userProfileFilterDto is required');
            }
            const response = await client.POST('/user-profile', {
                headers: {
                    'X-XSRF-TOKEN': getCsrfToken(),
                },
                credentials: 'include',
                body: userProfileFilterDto
            });

            if (response.error) {
                throw new Error('Failed to fetch user profiles: ' + response.response.status);
            }

            return response.data;
        },
        enabled: !!userProfileFilterDto,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};
