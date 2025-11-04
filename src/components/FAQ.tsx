import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/useTheme';

const FAQ = () => {
  const { t } = useTranslation('faq');
  const { theme } = useTheme();
  const [openItem, setOpenItem] = useState<string | null>(null);
  
  const toggleItem = (itemId: string) => {
    setOpenItem(openItem === itemId ? null : itemId);
  };

  const isDark = theme === 'dark';

  return (
    <section className="py-4 py-md-5 d-flex align-items-center" style={{ minHeight: '100vh' }}>
      <div className="container px-3">
        <div className="row justify-content-center mb-4 mb-md-5">
          <div className="col-lg-10 text-center">
            <h2 className="fw-bold mb-3 mb-md-4" style={{ 
              color: isDark ? 'var(--bs-light)' : 'var(--bs-dark)',
              fontSize: 'clamp(1.5rem, 5vw, 3rem)'
            }}>
              {t('title')}
            </h2>
            <p className="px-2" style={{ 
              color: isDark ? 'var(--bs-light)' : 'var(--bs-dark)',
              opacity: '0.85',
              fontSize: 'clamp(0.9rem, 2vw, 1.15rem)',
              lineHeight: '1.7'
            }}>
              {t('subtitle')}
            </p>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            {['general', 'freePlayers', 'premium', 'support'].map((categoryKey, categoryIndex) => (
              <div key={categoryIndex} className="mb-4 mb-md-5">
                <h3 
                  className="mb-3 mb-md-4 pb-2 pb-md-3 fw-semibold" 
                  style={{ 
                    color: isDark ? 'var(--bs-light)' : 'var(--bs-dark)', 
                    borderBottom: '2px solid var(--bs-danger)',
                    display: 'inline-block',
                    fontSize: 'clamp(1.1rem, 3vw, 1.3rem)'
                  }}
                >
                  {t(`categories.${categoryKey}.title`)}
                </h3>
                
                <div>
                  {['q1', 'q2', 'q3'].map((questionKey, questionIndex) => {
                    const itemId = `faq-${categoryIndex}-${questionIndex}`;
                    const isOpen = openItem === itemId;
                    
                    return (
                      <div 
                        key={questionIndex}
                        className="mb-2 mb-md-3"
                        style={{
                          border: '1px solid var(--bs-border-color)',
                          borderRadius: '12px',
                          backgroundColor: 'transparent',
                          overflow: 'hidden',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          if (!isOpen) {
                            e.currentTarget.style.borderColor = 'var(--bs-danger)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isOpen) {
                            e.currentTarget.style.borderColor = 'var(--bs-border-color)';
                          }
                        }}
                      >
                        <button
                          className="w-100 text-start d-flex justify-content-between align-items-center"
                          style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: isDark ? 'var(--bs-light)' : 'var(--bs-dark)',
                            fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            padding: 'clamp(0.75rem, 2vw, 1rem)'
                          }}
                          onClick={() => toggleItem(itemId)}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'var(--bs-danger)';
                          }}
                          onMouseLeave={(e) => {
                            const baseColor = isDark ? 'var(--bs-light)' : 'var(--bs-dark)';
                            e.currentTarget.style.color = baseColor;
                          }}
                        >
                          <span>{t(`categories.${categoryKey}.${questionKey}.question`)}</span>
                          <ChevronDown 
                            size={window.innerWidth < 768 ? 18 : 20}
                            style={{ 
                              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                              transition: 'transform 0.3s ease',
                              color: 'var(--bs-danger)',
                              marginLeft: '0.5rem',
                              flexShrink: 0
                            }}
                          />
                        </button>
                        
                        <div
                          style={{
                            maxHeight: isOpen ? '300px' : '0',
                            overflow: 'hidden',
                            transition: 'max-height 0.3s ease'
                          }}
                        >
                          <div 
                            style={{ 
                              backgroundColor: isDark ? 'rgba(95, 95, 95, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                              borderTop: '1px solid var(--bs-border-color)',
                              color: isDark ? 'var(--bs-light)' : 'var(--bs-dark)',
                              opacity: '0.9',
                              lineHeight: '1.7',
                              padding: 'clamp(0.75rem, 2vw, 1rem)',
                              fontSize: 'clamp(0.85rem, 2vw, 1rem)'
                            }}
                          >
                            {t(`categories.${categoryKey}.${questionKey}.answer`)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;