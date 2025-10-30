import { paths } from "@/openapi/crimeAiSchema";
import { useMutation } from "@tanstack/react-query";
import { PATH_CRIME_AI_API } from "./constants";
import { getCsrfToken } from "./util";

const REQUEST_PATH = '/register';
type CreateRegistrationDto = paths[typeof REQUEST_PATH]['post']['requestBody']['content']['application/json'];

const useRegisterVacationRental = () => {
    return useMutation({
        mutationFn: async (registration: Omit<CreateRegistrationDto, 'userType'>): Promise<void> => {
            const response = await fetch(PATH_CRIME_AI_API + REQUEST_PATH, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': getCsrfToken()
                },
                body: JSON.stringify({ ...registration, userType: 'VACATION_RENTAL' })
            });

            if (response.ok) {
                return;
            }

            // TODO handle conflict error (userName or email exist already)

            throw new Error('Server returned error response: ' + response.status);
        }
    });
};
export default useRegisterVacationRental;