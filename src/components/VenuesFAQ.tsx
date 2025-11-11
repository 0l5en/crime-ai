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
    <section className="py-4 py-md-5 d-flex align-items-center" style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      <div className="container px-3">
        <div className="row justify-content-center mb-4 mb-md-5">
          <div className="col-lg-10 text-center">
            <h2 className="fw-bold mb-3 mb-md-4" style={{ 
              color: '#2d3748',
              fontSize: 'clamp(1.5rem, 5vw, 3rem)'
            }}>
              {t('faq.title')}
            </h2>
            <p className="px-2" style={{ 
              color: '#4a5568',
              fontSize: 'clamp(0.9rem, 2vw, 1.15rem)',
              lineHeight: '1.7'
            }}>
              {t('faq.subtitle')}
            </p>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            {['gettingStarted', 'bookings', 'analytics', 'support'].map((categoryKey, categoryIndex) => (
              <div key={categoryIndex} className="mb-4 mb-md-5">
                <h3 
                  className="mb-3 mb-md-4 pb-2 pb-md-3 fw-semibold" 
                  style={{ 
                    color: '#2d3748', 
                    borderBottom: '3px solid var(--bs-danger)',
                    display: 'inline-block',
                    fontSize: 'clamp(1.1rem, 3vw, 1.3rem)'
                  }}
                >
                  {t(`faq.categories.${categoryKey}.title`)}
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
                          border: '2px solid rgba(203, 25, 28, 0.2)',
                          borderRadius: '12px',
                          backgroundColor: '#fff5f5',
                          overflow: 'hidden',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          if (!isOpen) {
                            e.currentTarget.style.borderColor = 'var(--bs-danger)';
                            e.currentTarget.style.backgroundColor = 'rgba(203, 25, 28, 0.08)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isOpen) {
                            e.currentTarget.style.borderColor = 'rgba(203, 25, 28, 0.2)';
                            e.currentTarget.style.backgroundColor = '#fff5f5';
                          }
                        }}
                      >
                        <button
                          className="w-100 text-start d-flex justify-content-between align-items-center"
                          style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: '#2d3748',
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
                            e.currentTarget.style.color = '#2d3748';
                          }}
                        >
                          <span>{t(`faq.categories.${categoryKey}.${questionKey}.question`)}</span>
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
                              backgroundColor: 'white',
                              borderTop: '1px solid rgba(203, 25, 28, 0.2)',
                              color: '#4a5568',
                              lineHeight: '1.7',
                              padding: 'clamp(0.75rem, 2vw, 1rem)',
                              fontSize: 'clamp(0.85rem, 2vw, 1rem)'
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