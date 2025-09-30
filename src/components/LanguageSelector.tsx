import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'de' as const, name: 'Deutsch', flag: '🇩🇪' },
  { code: 'en' as const, name: 'English', flag: '🇬🇧' },
  { code: 'it' as const, name: 'Italiano', flag: '🇮🇹' },
  { code: 'fr' as const, name: 'Français', flag: '🇫🇷' },
];

interface LanguageSelectorProps {
  variant?: 'desktop' | 'mobile';
}

const LanguageSelector = ({ variant = 'desktop' }: LanguageSelectorProps) => {
  const { currentLanguage, changeLanguage } = useLanguage();
  const currentLang = languages.find(lang => lang.code === currentLanguage);

  if (variant === 'mobile') {
    return (
      <div className="d-flex flex-column gap-2 mb-3">
        <div className="d-flex align-items-center gap-2 mb-2">
          <Globe size={20} />
          <span className="fw-semibold">Language / Sprache</span>
        </div>
        <div className="btn-group w-100" role="group">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              className={`btn ${currentLanguage === lang.code ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => changeLanguage(lang.code)}
            >
              <span className="me-1">{lang.flag}</span>
              {lang.name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="dropdown">
      <button
        className="btn btn-link text-decoration-none d-flex align-items-center gap-2 p-0"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{ fontSize: '1.5rem' }}
      >
        <span>{currentLang?.flag}</span>
      </button>
      <ul 
        className="dropdown-menu dropdown-menu-end" 
        style={{ 
          backgroundColor: 'var(--bs-body-bg)', 
          zIndex: 1050,
          minWidth: '180px'
        }}
      >
        {languages.map((lang) => (
          <li key={lang.code}>
            <button
              className={`dropdown-item d-flex align-items-center gap-2 ${currentLanguage === lang.code ? 'active' : ''}`}
              onClick={() => changeLanguage(lang.code)}
            >
              <span style={{ fontSize: '1.2rem' }}>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageSelector;
