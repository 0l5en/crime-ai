
import { Home, Search, Users, UserX } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

interface CaseTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const CaseTabs = ({ activeTab, onTabChange }: CaseTabsProps) => {
  const isMobile = useIsMobile();
  
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'evidence', label: 'Evidence', icon: Search },
    { id: 'witnesses', label: 'Witnesses', icon: Users },
    { id: 'suspects', label: 'Suspects', icon: UserX },
  ];

  return (
    <div className="mb-4">
      <ul className="nav nav-tabs border-0 d-flex w-100" style={{ backgroundColor: 'transparent' }}>
        {tabs.map((tab) => (
          <li key={tab.id} className="nav-item flex-fill">
            <button 
              className={`nav-link border-0 ${isMobile ? 'px-2 py-3' : 'px-4 py-3'} fw-medium w-100 text-center d-flex align-items-center justify-content-center ${
                activeTab === tab.id 
                  ? 'active text-white' 
                  : 'text-muted'
              }`}
              onClick={() => onTabChange(tab.id)}
              style={{ 
                backgroundColor: activeTab === tab.id ? '#2a2a2a' : 'transparent',
                borderRadius: '8px 8px 0 0',
                marginRight: tab.id !== 'suspects' ? '2px' : '0'
              }}
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

export default CaseTabs;
