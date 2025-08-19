
interface CaseTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const CaseTabs = ({ activeTab, onTabChange }: CaseTabsProps) => {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'evidence', label: 'Evidences' },
    { id: 'witnesses', label: 'Witnesses' },
    { id: 'suspects', label: 'Suspects' },
  ];

  return (
    <div className="mb-4">
      <ul className="nav nav-tabs border-0" style={{ backgroundColor: 'transparent' }}>
        {tabs.map((tab) => (
          <li key={tab.id} className="nav-item">
            <button 
              className={`nav-link border-0 px-4 py-3 fw-medium ${
                activeTab === tab.id 
                  ? 'active text-white' 
                  : 'text-muted'
              }`}
              onClick={() => onTabChange(tab.id)}
              style={{ 
                backgroundColor: activeTab === tab.id ? '#2a2a2a' : 'transparent',
                borderRadius: '8px 8px 0 0',
                marginRight: '2px'
              }}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CaseTabs;
