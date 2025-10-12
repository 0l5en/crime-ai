import { Play, MapPin, Gift } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HowItWorks = () => {
  const { t } = useTranslation('venues');

  return (
    <section className="py-5 bg-dark text-light d-flex align-items-center" style={{ minHeight: '100vh' }} data-section="how-it-works">
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-10 text-center">
            <h2 className="display-3 fw-bold mb-4" style={{ 
              color: 'var(--bs-light)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)'
            }}>
              {t('howItWorks.title')}
            </h2>
            <p className="lead text-light" style={{ 
              opacity: '0.85',
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              lineHeight: '1.7'
            }}>
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
                  className="text-center p-5 h-100"
                  style={{
                    border: '1px solid rgba(203, 25, 28, 0.2)',
                    borderRadius: '20px',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--bs-danger)';
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(203, 25, 28, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(203, 25, 28, 0.2)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Step Number Badge */}
                  <div 
                    className="position-absolute"
                    style={{
                      top: '-20px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: 'var(--bs-danger)',
                      color: 'white',
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      boxShadow: '0 4px 15px rgba(203, 25, 28, 0.4)',
                      border: '3px solid var(--bs-dark)'
                    }}
                  >
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mb-4" style={{ marginTop: '40px' }}>
                    <div
                      className="mx-auto d-flex align-items-center justify-content-center"
                      style={{
                        width: '100px',
                        height: '100px',
                        backgroundColor: 'rgba(203, 25, 28, 0.1)',
                        borderRadius: '50%',
                        border: '3px solid var(--bs-danger)'
                      }}
                    >
                      <IconComponent 
                        size={40} 
                        style={{ color: 'var(--bs-danger)' }}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h4 
                    className="mb-3" 
                    style={{ 
                      color: 'var(--bs-light)', 
                      fontWeight: '700',
                      fontSize: '1.5rem'
                    }}
                  >
                    {t(`howItWorks.steps.${step.key}.title`)}
                  </h4>

                  {/* Description */}
                  <p 
                    className="text-light mb-0" 
                    style={{ 
                      opacity: '0.85',
                      lineHeight: '1.7',
                      fontSize: '1rem'
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