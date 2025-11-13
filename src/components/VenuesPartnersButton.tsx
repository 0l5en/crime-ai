import { Link } from "react-router-dom";
import { Award } from "lucide-react";
import { useTranslation } from "react-i18next";

const VenuesPartnersButton = () => {
  const { t } = useTranslation('venues');

  return (
    <div className="container py-5">
      <div className="text-center">
        <Link 
          to="/partners"
          className="btn btn-outline-danger btn-lg d-inline-flex align-items-center gap-2"
          style={{
            borderWidth: '2px',
            transition: 'all 0.3s ease'
          }}
        >
          <Award size={20} />
          <span>{t('partnersButton.text')}</span>
        </Link>
        <p className="text-muted mt-2 small opacity-75">
          {t('partnersButton.subtitle')}
        </p>
      </div>
    </div>
  );
};

export default VenuesPartnersButton;
