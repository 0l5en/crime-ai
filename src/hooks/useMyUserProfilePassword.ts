import { useUserContext } from '@/contexts/UserContext';
import type { paths } from '@/openapi/crimeAiSchema';
import { useMutation } from '@tanstack/react-query';
import createClient from 'openapi-fetch';
import toast from "react-hot-toast";
import { useTranslation } from 'react-i18next';
import { PATH_CRIME_AI_API } from './constants';
import { getCsrfToken } from './util';

export const useMyUserProfilePassword = () => {
    const client = createClient<paths>({ baseUrl: PATH_CRIME_AI_API });
    const user = useUserContext();
    const { t } = useTranslation('useMyUserProfilePassword');

    return useMutation({
        mutationFn: async () => {
            if (!user.email) {
                throw new Error('User not authenticated');
            }
            const response = await client.PUT('/user-profile-my-password', {
                headers: {
                    'X-XSRF-TOKEN': getCsrfToken(),
                },
                credentials: 'include',
                params: {
                    query: {
                        redirectUri: window.location.href
                    }
                }
            });

            if (response.error) {
                throw new Error('Failed to request password reset email: ' + response.response.status);
            }

            // Return
            return;
        },
        onSuccess: () => {
            toast.success(t('requestSubmitted'));
        },
        onError: (error) => {
            toast.error(t('requestFailed'));
        },
    });
};
