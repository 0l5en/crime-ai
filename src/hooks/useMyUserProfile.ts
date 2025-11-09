import { useUserContext } from '@/contexts/UserContext';
import type { components, paths } from '@/openapi/crimeAiSchema';
import { useQuery } from '@tanstack/react-query';
import createClient from 'openapi-fetch';
import { PATH_CRIME_AI_API } from './constants';

type UserProfileFilterDto = components['schemas']['UserProfileFilterDto'];

export const useMyUserProfile = () => {
    const client = createClient<paths>({ baseUrl: PATH_CRIME_AI_API });
    const user = useUserContext();

    return useQuery({
        queryKey: ['myUserProfile'],
        queryFn: async () => {
            if (!user.email) {
                throw new Error('User not authenticated');
            }

            const userProfileFilterDto: UserProfileFilterDto = {
                search: user.email,
                maxResults: 1,
            };

            const response = await client.GET('/user-profile-my');

            if (response.error) {
                throw new Error('Failed to fetch user profile: ' + response.response.status);
            }

            // Return the first item from the result set
            return response.data;
        },
        enabled: !!user.email,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};
