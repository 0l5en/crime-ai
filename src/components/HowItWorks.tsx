import { Play, MapPin, Gift } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HowItWorks = () => {
  const { t } = useTranslation('venues');

  return (
    <section className="py-5 bg-dark text-light d-flex align-items-center" style={{ minHeight: '100vh' }} data-section="how-it-works">
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <h2 className="display-4 fw-bold mb-4" style={{ color: 'var(--bs-light)' }}>{t('howItWorks.title')}</h2>
            <p className="lead text-light" style={{ opacity: '0.9' }}>
              {t('howItWorks.subtitle')}
            </p>
          </div>
        </div>

        <div className="row g-5">
          {[
            { number: "01", icon: Play, key: 'trial' },
            { number: "02", icon: MapPin, key: 'register' },
            { number: "03", icon: Gift, key: 'exclusive' }
          ].map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="col-md-4">
                <div 
                  className="text-center p-4 h-100"
                  style={{
                    border: '1px solid var(--bs-border-color)',
                    borderRadius: '16px',
                    backgroundColor: 'transparent',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--bs-danger)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(203, 25, 28, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--bs-border-color)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Step Number Badge */}
                  <div 
                    className="position-absolute"
                    style={{
                      top: '-15px',
                      left: '20px',
                      backgroundColor: 'var(--bs-danger)',
                      color: 'white',
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mb-4" style={{ marginTop: '20px' }}>
                    <div
                      className="mx-auto d-flex align-items-center justify-content-center"
                      style={{
                        width: '80px',
                        height: '80px',
                        backgroundColor: 'rgba(203, 25, 28, 0.1)',
                        borderRadius: '50%',
                        border: '2px solid var(--bs-danger)'
                      }}
                    >
                      <IconComponent 
                        size={32} 
                        style={{ color: 'var(--bs-danger)' }}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h4 
                    className="mb-3" 
                    style={{ 
                      color: 'var(--bs-light)', 
                      fontWeight: '600' 
                    }}
                  >
                    {t(`howItWorks.steps.${step.key}.title`)}
                  </h4>

                  {/* Description */}
                  <p 
                    className="text-light mb-0" 
                    style={{ 
                      opacity: '0.9',
                      lineHeight: '1.6',
                      fontSize: '0.95rem'
                    }}
                  >
                    {t(`howItWorks.steps.${step.key}.description`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;