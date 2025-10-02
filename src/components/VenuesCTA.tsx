import { ArrowRight, CreditCard, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const VenuesCTA = () => {
  const { t } = useTranslation('venues');

  return (
    <section 
      className="py-5 bg-dark text-light d-flex align-items-center" 
      style={{ minHeight: '100vh' }} 
      data-section="contact"
    >
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-lg-8">
            <h3 className="display-3 fw-bold mb-4 text-white">
              {t('cta.title')} <span style={{ color: 'var(--bs-danger)' }}>{t('cta.titleHighlight1')}</span> {t('cta.titleMiddle')} <span style={{ color: 'var(--bs-danger)' }}>{t('cta.titleHighlight2')}</span>!
            </h3>
            
            <p className="lead mb-4 text-light" style={{ fontSize: '1.25rem', opacity: '0.9' }}>
              {t('cta.subtitle')} <span style={{ color: 'var(--bs-danger)' }}>{t('cta.subtitleHighlight')}</span> {t('cta.subtitleEnd')}
            </p>
            
            

            {/* Feature Benefits */}
            <div className="row justify-content-center mb-5">
              {[
                { icon: CreditCard, key: 'ai' },
                { icon: MessageCircle, key: 'trial' },
                { icon: ArrowRight, key: 'cancel' }
              ].map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="col-md-4 mb-3">
                    <div className="d-flex align-items-center justify-content-center">
                      <div
                        className="me-3 rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          width: '32px',
                          height: '32px',
                          backgroundColor: 'rgba(203, 25, 28, 0.2)',
                          border: '1px solid var(--bs-danger)'
                        }}
                      >
                        <IconComponent size={16} style={{ color: 'var(--bs-danger)' }} />
                      </div>
                      <span className="text-light fs-5">{t(`cta.features.${feature.key}`)}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
              <button 
                className="px-5 py-3 fw-semibold d-flex align-items-center justify-content-center gap-2" 
                style={{ 
                  fontSize: '1.1rem',
                  borderRadius: '12px',
                  backgroundColor: 'var(--bs-danger)',
                  color: 'white',
                  border: 'none',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#a8161a';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bs-danger)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <CreditCard size={20} />
                {t('cta.buttons.register')}
              </button>
              
              <button 
                className="px-5 py-3 fw-semibold d-flex align-items-center justify-content-center gap-2" 
                style={{ 
                  fontSize: '1.1rem',
                  borderRadius: '12px',
                  backgroundColor: 'transparent',
                  color: 'var(--bs-danger)',
                  border: '1px solid var(--bs-danger)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(203, 25, 28, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <MessageCircle size={20} />
                {t('cta.buttons.contact')}
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VenuesCTA;