import useLogout from "@/hooks/useLogout";
import { useTranslation } from "react-i18next";

const LogoutButton = ({ onLogout }: { onLogout?: () => void }) => {
    const { mutate: logout, isPending } = useLogout();
    const { t } = useTranslation('common');
    return (
        <button
            className="btn btn-outline-secondary w-100"
            disabled={isPending}
            type="submit"
            onClick={() => {
                if (onLogout) {
                    onLogout();
                }
                logout();
            }}
        >
            {t('nav.logout')}
        </button>
    );
}

export default LogoutButton;