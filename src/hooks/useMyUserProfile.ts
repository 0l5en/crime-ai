import type { components, paths } from '@/openapi/crimeAiSchema';
import { useQuery } from '@tanstack/react-query';
import createClient from 'openapi-fetch';
import { PATH_CRIME_AI_API } from './constants';
import { getCsrfToken } from './util';
import { useUserContext } from '@/contexts/UserContext';

type UserProfileFilterDto = components['schemas']['UserProfileFilterDto'];

export const useMyUserProfile = () => {
    const client = createClient<paths>({ baseUrl: PATH_CRIME_AI_API });
    const user = useUserContext();

    return useQuery({
        queryKey: ['myUserProfile', user.email],
        queryFn: async () => {
            if (!user.email) {
                throw new Error('User email is required');
            }

            const userProfileFilterDto: UserProfileFilterDto = {
                search: user.email,
                maxResults: 1,
            };

            const response = await client.POST('/user-profile', {
                headers: {
                    'X-XSRF-TOKEN': getCsrfToken(),
                },
                credentials: 'include',
                body: userProfileFilterDto
            });

            if (response.error) {
                throw new Error('Failed to fetch user profile: ' + response.response.status);
            }

            // Return the first item from the result set
            return response.data?.items?.[0];
        },
        enabled: !!user.email,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};
