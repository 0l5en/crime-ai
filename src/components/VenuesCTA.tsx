import { ArrowRight, CreditCard, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const VenuesCTA = () => {
  const { t } = useTranslation('venues');
  const navigate = useNavigate();

  return (
    <section 
      className="py-4 py-md-5 bg-dark text-light d-flex align-items-center" 
      style={{ minHeight: '100vh' }} 
      data-section="contact"
    >
      <div className="container px-3">
        <div className="row justify-content-center text-center">
          <div className="col-lg-10">
            <h3 className="fw-bold mb-3 mb-md-5 text-white" style={{
              fontSize: 'clamp(1.5rem, 5vw, 3.5rem)',
              lineHeight: '1.2'
            }}>
              {t('cta.title')} <span style={{ color: 'var(--bs-danger)' }}>{t('cta.titleHighlight1')}</span> {t('cta.titleMiddle')} <span style={{ color: 'var(--bs-danger)' }}>{t('cta.titleHighlight2')}</span>!
            </h3>
            
            <p className="mb-4 mb-md-5 text-light px-2" style={{ 
              fontSize: 'clamp(0.9rem, 2vw, 1.25rem)', 
              opacity: '0.85',
              lineHeight: '1.7',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              {t('cta.subtitle')} <span style={{ color: 'var(--bs-danger)', fontWeight: '600' }}>{t('cta.subtitleHighlight')}</span> {t('cta.subtitleEnd')}
            </p>
            
            

            {/* Feature Benefits */}
            <div className="row justify-content-center mb-3 mb-md-5 g-2 g-md-4">
              {[
                { icon: CreditCard, key: 'ai' },
                { icon: MessageCircle, key: 'trial' },
                { icon: ArrowRight, key: 'cancel' }
              ].map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="col-md-4">
                    <div 
                      className="d-flex align-items-center justify-content-center p-3"
                      style={{
                        backgroundColor: 'rgba(203, 25, 28, 0.1)',
                        borderRadius: '12px',
                        border: '1px solid rgba(203, 25, 28, 0.3)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(203, 25, 28, 0.15)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(203, 25, 28, 0.1)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <div
                        className="me-3 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{
                          width: '40px',
                          height: '40px',
                          backgroundColor: 'var(--bs-danger)',
                          boxShadow: '0 4px 12px rgba(203, 25, 28, 0.3)'
                        }}
                      >
                        <IconComponent size={20} style={{ color: 'white' }} />
                      </div>
                      <span className="text-light fw-semibold" style={{ fontSize: '1.1rem' }}>
                        {t(`cta.features.${feature.key}`)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="d-flex flex-column flex-md-row gap-2 gap-md-4 justify-content-center">
              <button 
                onClick={() => navigate('/venue-register')}
                className="fw-bold d-flex align-items-center justify-content-center gap-2 gap-md-3" 
                style={{ 
                  fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                  borderRadius: '16px',
                  padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1rem, 3vw, 1.5rem)',
                  backgroundColor: 'var(--bs-danger)',
                  color: 'white',
                  border: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 6px 25px rgba(203, 25, 28, 0.4)',
                  minWidth: '250px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#a8161a';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 10px 35px rgba(203, 25, 28, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bs-danger)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 25px rgba(203, 25, 28, 0.4)';
                }}
              >
                <CreditCard size={24} />
                {t('cta.buttons.register')}
              </button>
              
              <button 
                className="fw-bold d-flex align-items-center justify-content-center gap-2 gap-md-3" 
                style={{ 
                  fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                  borderRadius: '16px',
                  padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1rem, 3vw, 1.5rem)',
                  backgroundColor: 'transparent',
                  color: 'white',
                  border: '2px solid var(--bs-danger)',
                  transition: 'all 0.3s ease',
                  minWidth: '250px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(203, 25, 28, 0.15)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 10px 35px rgba(203, 25, 28, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <MessageCircle size={24} />
                {t('cta.buttons.contact')}
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VenuesCTA;