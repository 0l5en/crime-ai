import { useUserContext } from "@/contexts/UserContext";
import useLoginOptions from "./useLoginOptions";

const useSignIn = ({ postLoginSuccessUri }: { postLoginSuccessUri?: string }) => {
    const { data } = useLoginOptions();
    const user = useUserContext();

    const signIn = () => {
        if (!user.isAuthenticated && data && data.length > 0 && data[0].loginUri) {
            const url = new URL(data[0].loginUri);
            url.searchParams.append(
                "post_login_success_uri",
                postLoginSuccessUri ?? `${window.location.href}`
            );
            url.searchParams.append(
                "post_login_failure_uri",
                `${window.location.origin}/login-error`
            );
            const loginUrl = url.toString();
            window.location.href = loginUrl;
        }
    }

    return { signIn };
}

export default useSignIn;