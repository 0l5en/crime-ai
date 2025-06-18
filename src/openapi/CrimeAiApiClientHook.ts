import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import { paths } from "./crimeAiSchema.ts";

export const useCrimeAiApiClient = ({ baseUrl, apiToken }: { baseUrl: string, apiToken: string }) => {
    const fetchClient = createFetchClient<paths>({
        baseUrl,
        headers: { "Authorization": "Bearer " + apiToken, "Accept": "application/json" }
    });
    const crimeAiApiClient = createClient(fetchClient);
    return { crimeAiApiClient };
}