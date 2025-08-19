
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
    <ul className="nav nav-tabs bg-dark border-0 mb-4">
      {tabs.map((tab) => (
        <li key={tab.id} className="nav-item">
          <button 
            className={`nav-link text-light border-0 ${
              activeTab === tab.id 
                ? 'active bg-secondary' 
                : 'bg-dark hover-bg-secondary'
            }`}
            onClick={() => onTabChange(tab.id)}
            style={{ 
              borderRadius: '0.375rem 0.375rem 0 0',
              marginRight: '0.25rem'
            }}
          >
            {tab.label}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CaseTabs;
