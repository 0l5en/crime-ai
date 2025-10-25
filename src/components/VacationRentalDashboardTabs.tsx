import { FileText, Home } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';
import { useTranslation } from 'react-i18next';

interface VacationRentalDashboardTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const VacationRentalDashboardTabs = ({ activeTab, onTabChange }: VacationRentalDashboardTabsProps) => {
  const { t } = useTranslation('vacationRentalDashboard');
  const isMobile = useIsMobile();

  const tabs = [
    { id: 'cases', label: t('tabs.cases'), icon: Home },
    { id: 'promotion', label: t('tabs.promotion'), icon: FileText },
  ];

  return (
    <div className="mb-4">
      <div className="row g-4">
        {tabs.map((tab) => (
          <div key={tab.id} className="col-12 col-lg-6">
            <button
              className={`btn btn-outline-primary ${isMobile ? 'px-2 py-3' : 'px-4 py-3'} fw-medium w-100 text-center d-flex align-items-center justify-content-center ${activeTab === tab.id
                ? 'active text-primary'
                : 'border-dark'
                }`}
              onClick={() => onTabChange(tab.id)}
              aria-label={isMobile ? tab.label : undefined}
              title={isMobile ? tab.label : undefined}
            >
              {isMobile ? (
                <tab.icon size={18} />
              ) : (
                <>
                  <tab.icon size={18} className="me-2" />
                  {tab.label}
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VacationRentalDashboardTabs;