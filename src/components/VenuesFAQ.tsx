import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const VenuesFAQ = () => {
  const { t } = useTranslation('venues');
  const [openItem, setOpenItem] = useState<string | null>(null);
  
  const toggleItem = (itemId: string) => {
    setOpenItem(openItem === itemId ? null : itemId);
  };

  return (
    <section className="py-5 bg-dark text-light d-flex align-items-center" style={{ minHeight: '100vh' }}>
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-10 text-center">
            <h2 className="display-3 fw-bold mb-4" style={{ 
              color: 'var(--bs-light)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)'
            }}>
              {t('faq.title')}
            </h2>
            <p className="lead text-light" style={{ 
              opacity: '0.85',
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              lineHeight: '1.7'
            }}>
              {t('faq.subtitle')}
            </p>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            {['gettingStarted', 'bookings', 'analytics', 'support'].map((categoryKey, categoryIndex) => (
              <div key={categoryIndex} className="mb-5">
                <h3 
                  className="mb-4 pb-3 fw-semibold" 
                  style={{ 
                    color: 'var(--bs-light)', 
                    borderBottom: '2px solid var(--bs-danger)',
                    display: 'inline-block'
                  }}
                >
                  {t(`faq.categories.${categoryKey}.title`)}
                </h3>
                
                <div className="space-y-3">
                  {['q1', 'q2', 'q3'].map((questionKey, questionIndex) => {
                    const itemId = `faq-${categoryIndex}-${questionIndex}`;
                    const isOpen = openItem === itemId;
                    
                    return (
                      <div 
                        key={questionIndex}
                        className="mb-3"
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
                          className="w-100 p-4 text-start d-flex justify-content-between align-items-center"
                          style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: 'var(--bs-light)',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}
                          onClick={() => toggleItem(itemId)}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'var(--bs-danger)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--bs-light)';
                          }}
                        >
                          <span>{t(`faq.categories.${categoryKey}.${questionKey}.question`)}</span>
                          <ChevronDown 
                            size={20} 
                            style={{ 
                              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                              transition: 'transform 0.3s ease',
                              color: 'var(--bs-danger)'
                            }}
                          />
                        </button>
                        
                        <div
                          style={{
                            maxHeight: isOpen ? '200px' : '0',
                            overflow: 'hidden',
                            transition: 'max-height 0.3s ease'
                          }}
                        >
                          <div 
                            className="p-4"
                            style={{ 
                              backgroundColor: 'rgba(95, 95, 95, 0.1)',
                              borderTop: '1px solid var(--bs-border-color)',
                              color: 'var(--bs-light)',
                              opacity: '0.9',
                              lineHeight: '1.7'
                            }}
                          >
                            {t(`faq.categories.${categoryKey}.${questionKey}.answer`)}
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

export default VenuesFAQ;