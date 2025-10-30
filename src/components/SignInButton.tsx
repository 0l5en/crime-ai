import { useUserContext } from "@/contexts/UserContext";
import useLoginOptions from "@/hooks/useLoginOptions";
import useSignIn from "@/hooks/useSignIn";
import { useTranslation } from "react-i18next";

const SignInButton = ({ postLoginSuccessUri }: { postLoginSuccessUri?: string }) => {

    const { t } = useTranslation('common');
    const { data } = useLoginOptions();
    const user = useUserContext();
    const { signIn } = useSignIn({ postLoginSuccessUri });

    return (
        <button
            className="btn btn-outline-secondary"
            disabled={user.isAuthenticated || data === undefined || data.length === 0 || data[0].loginUri === undefined}
            onClick={() => signIn()}
        >
            {t('nav.signIn')}
        </button>
    );
}

export default SignInButton;