import { useUserContext } from "@/contexts/UserContext";
import useLoginOptions from "@/hooks/useLoginOptions";
import { useTranslation } from "react-i18next";

const SignInButton = () => {

    const { t } = useTranslation('common');
    const { data } = useLoginOptions();
    const user = useUserContext();

    const login = () => {
        if (data && data.length > 1 && data[0].loginUri) {
            const url = new URL(data[0].loginUri);
            url.searchParams.append(
                "post_login_success_uri",
                `${window.location.href}`
            );
            url.searchParams.append(
                "post_login_failure_uri",
                `${window.location.origin}/login-error`
            );
            const loginUrl = url.toString();
            window.location.href = loginUrl;
        }
    }

    return (
        <button
            className="btn btn-outline-secondary"
            disabled={user.isAuthenticated || data === undefined || data.length === 0 || data[0].loginUri === undefined}
            onClick={() => login()}
        >
            {t('nav.signIn')}
        </button>
    );
}

export default SignInButton;