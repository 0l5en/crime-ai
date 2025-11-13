import { Link } from "react-router-dom";
import { Award } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/hooks/useTheme";

const VenuesPartnersButton = () => {
  const { t } = useTranslation('venues');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section 
      className="py-5" 
      style={{ 
        backgroundColor: isDark ? '#181D35' : '#F7FAFC' 
      }}
    >
      <div className="container">
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
        </div>
      </div>
    </section>
  );
};

export default VenuesPartnersButton;
