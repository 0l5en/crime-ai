import { CreditCard, FileText, Home } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

interface VacationRentalDashboardTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const VacationRentalDashboardTabs = ({ activeTab, onTabChange }: VacationRentalDashboardTabsProps) => {
  const isMobile = useIsMobile();

  const tabs = [
    { id: 'cases', label: 'Cases', icon: Home },
    { id: 'promotion', label: 'Promotion-Material', icon: FileText },
    { id: 'subscription', label: 'Subscription', icon: CreditCard },
  ];

  return (
    <div className="mb-4">
      <ul className="nav nav-tabs border-0 d-flex w-100">
        {tabs.map((tab, index) => (
          <li key={tab.id} className={`nav-item flex-fill ${index !== 0 ? 'ms-4' : ''}`}>
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VacationRentalDashboardTabs;