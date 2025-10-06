import { useQuery } from '@tanstack/react-query';
import { PATH_LOGIN_OPTIONS } from './constants';

type LoginOption = {
    label: string;
    loginUri: string;
    providerIssuerAuthority: string;
}

const useLoginOptions = () => {
    return useQuery({
        queryKey: ['getLoginOptions'],
        queryFn: async (): Promise<Array<LoginOption>> => {
            const response = await fetch(`${PATH_LOGIN_OPTIONS}`);
            if (response.ok) {
                const data = await response.json();
                return data as LoginOption[];
            }
            throw new Error("Server returned error response: " + response.status);
        }
    });
}

export default useLoginOptions;