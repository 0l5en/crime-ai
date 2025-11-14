import { ArrowRight, CreditCard, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';

const VenuesCTA = () => {
  const { t } = useTranslation('venues');
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section 
      className="py-5 py-md-6" 
      style={{ 
        backgroundColor: isDark ? '#181D35' : '#f7fafc',
        marginTop: 'clamp(2rem, 4vw, 4rem)'
      }} 
      data-section="contact"
    >
      <div className="container px-3">
        <div className="row justify-content-center text-center">
          <div className="col-lg-10">
            <h3 className={isDark ? "fw-bold mb-3 mb-md-4 text-light" : "fw-bold mb-3 mb-md-4"} style={{
              fontSize: 'clamp(1.1rem, 3.5vw, 1.85rem)',
              lineHeight: '1.2',
              color: isDark ? undefined : '#2d3748'
            }}>
              {t('cta.title')} <span style={{ color: 'var(--bs-danger)' }}>{t('cta.titleHighlight1')}</span> {t('cta.titleMiddle')} <span style={{ color: 'var(--bs-danger)' }}>{t('cta.titleHighlight2')}</span>!
            </h3>
            
            <p className={isDark ? "mb-4 mb-md-5 px-2 text-light" : "mb-4 mb-md-5 px-2"} style={{ 
              fontSize: 'clamp(0.9rem, 2vw, 1.15rem)', 
              color: isDark ? undefined : '#4a5568',
              opacity: isDark ? 0.75 : 1,
              lineHeight: '1.6',
              maxWidth: '750px',
              margin: '0 auto'
            }}>
              {t('cta.subtitle')} <span style={{ color: 'var(--bs-danger)', fontWeight: '600' }}>{t('cta.subtitleHighlight')}</span> {t('cta.subtitleEnd')}
            </p>
            
            

            {/* Feature Benefits */}
            <div className="row justify-content-center mb-4 mb-md-5 g-3">
              {[
                { icon: CreditCard, key: 'ai' },
                { icon: MessageCircle, key: 'trial' },
                { icon: ArrowRight, key: 'cancel' }
              ].map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="col-md-4">
                    <div 
                      className="d-flex align-items-center justify-content-center py-3 px-3"
                      style={{
                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : '#fff5f5',
                        borderRadius: '10px',
                        border: isDark ? '2px solid rgba(255, 255, 255, 0.1)' : '2px solid rgba(203, 25, 28, 0.2)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(203, 25, 28, 0.08)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.borderColor = isDark ? 'rgba(220, 38, 38, 0.4)' : 'var(--bs-danger)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.03)' : '#fff5f5';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(203, 25, 28, 0.2)';
                      }}
                    >
                      <div
                        className="me-2 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{
                          width: '36px',
                          height: '36px',
                          backgroundColor: 'var(--bs-danger)',
                          boxShadow: '0 4px 12px rgba(203, 25, 28, 0.3)'
                        }}
                      >
                        <IconComponent size={18} style={{ color: 'white' }} />
                      </div>
                      <span className={isDark ? "fw-semibold text-light" : "fw-semibold"} style={{ 
                        fontSize: '1rem', 
                        color: isDark ? undefined : '#2d3748' 
                      }}>
                        {t(`cta.features.${feature.key}`)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="d-flex flex-column flex-md-row gap-2 gap-md-3 justify-content-center mx-auto" style={{ maxWidth: '100%' }}>
              <button 
                onClick={() => navigate('/venue-register')}
                className="fw-bold d-flex align-items-center justify-content-center gap-2 flex-grow-1" 
                style={{ 
                  fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                  borderRadius: '14px',
                  padding: 'clamp(0.7rem, 2vw, 0.9rem) clamp(1rem, 3vw, 1.35rem)',
                  backgroundColor: 'var(--bs-danger)',
                  color: 'white',
                  border: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 20px rgba(203, 25, 28, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#a8161a';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(203, 25, 28, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bs-danger)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(203, 25, 28, 0.3)';
                }}
              >
                <CreditCard size={20} />
                {t('cta.buttons.register')}
              </button>
              
              <button 
                onClick={() => navigate('/contact')}
                className="fw-bold d-flex align-items-center justify-content-center gap-2 flex-grow-1" 
                style={{ 
                  fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                  borderRadius: '14px',
                  padding: 'clamp(0.7rem, 2vw, 0.9rem) clamp(1rem, 3vw, 1.35rem)',
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'white',
                  color: 'var(--bs-danger)',
                  border: isDark ? '2px solid rgba(255, 255, 255, 0.2)' : '2px solid var(--bs-danger)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.08)' : '#fff5f5';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(203, 25, 28, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'white';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <MessageCircle size={20} />
                {t('cta.buttons.contact')}
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VenuesCTA;