import { useMutation } from "@tanstack/react-query";
import { PATH_LOGOUT } from "./constants";
import { getCsrfToken } from "./util";

const useLogout = () => {
    return useMutation({
        mutationFn: async () => {
            const response = await fetch(PATH_LOGOUT, {
                method: 'POST',
                headers: {
                    'X-POST-LOGOUT-SUCCESS-URI': `${window.location.origin}`,
                    'X-XSRF-TOKEN': getCsrfToken()
                }
            });

            if (response.ok) {
                window.location.href = response.headers.get('location');
            } else {
                throw new Error('Server returned error response: ' + response.status);
            }
        },

    });
}

export default useLogout;