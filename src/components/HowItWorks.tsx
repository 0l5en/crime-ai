import { Play, MapPin, Gift } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/useTheme';

const HowItWorks = () => {
  const { t } = useTranslation('venues');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className="py-4 py-md-5 d-flex align-items-center" style={{ 
      minHeight: '100vh', 
      backgroundColor: isDark ? '#16213e' : '#f7fafc' 
    }} data-section="how-it-works">
      <div className="container px-3">
        <div className="row justify-content-center mb-4 mb-md-5">
          <div className="col-lg-10 text-center">
            <h2 className={isDark ? "fw-bold mb-3 mb-md-4 text-light" : "fw-bold mb-3 mb-md-4"} style={{ 
              color: isDark ? undefined : '#2d3748',
              fontSize: 'clamp(1.5rem, 5vw, 3rem)'
            }}>
              {t('howItWorks.title')}
            </h2>
            <p className={isDark ? "px-2 text-light" : "px-2"} style={{ 
              color: isDark ? undefined : '#4a5568',
              opacity: isDark ? 0.75 : 1,
              fontSize: 'clamp(0.9rem, 2vw, 1.15rem)',
              lineHeight: '1.7'
            }}>
              {t('howItWorks.subtitle')}
            </p>
          </div>
        </div>

        <div className="row g-3 g-md-4 g-lg-5">
          {[
            { number: "01", icon: Play, key: 'trial' },
            { number: "02", icon: MapPin, key: 'register' },
            { number: "03", icon: Gift, key: 'exclusive' }
          ].map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="col-md-4">
                <div 
                  className="text-center h-100"
                  style={{
                    border: isDark ? '2px solid rgba(255, 255, 255, 0.1)' : '2px solid rgba(203, 25, 28, 0.2)',
                    borderRadius: '20px',
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'white',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    padding: 'clamp(1.5rem, 4vw, 3rem)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = isDark ? 'rgba(220, 38, 38, 0.4)' : 'var(--bs-danger)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 10px 35px rgba(203, 25, 28, 0.2)';
                    e.currentTarget.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.06)' : '#fff5f5';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(203, 25, 28, 0.2)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.03)' : 'white';
                  }}
                >
                  {/* Step Number Badge */}
                  <div 
                    className="position-absolute"
                    style={{
                      top: 'clamp(-15px, -3vw, -20px)',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: 'var(--bs-danger)',
                      color: 'white',
                      width: 'clamp(40px, 10vw, 50px)',
                      height: 'clamp(40px, 10vw, 50px)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                      fontWeight: 'bold',
                      boxShadow: '0 4px 15px rgba(203, 25, 28, 0.4)',
                      border: isDark ? '3px solid rgba(255, 255, 255, 0.2)' : '3px solid white'
                    }}
                  >
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mb-3 mb-md-4" style={{ marginTop: 'clamp(25px, 6vw, 40px)' }}>
                    <div
                      className="mx-auto d-flex align-items-center justify-content-center"
                      style={{
                        width: 'clamp(70px, 18vw, 100px)',
                        height: 'clamp(70px, 18vw, 100px)',
                        backgroundColor: isDark ? 'rgba(220, 38, 38, 0.2)' : '#fff5f5',
                        borderRadius: '50%',
                        border: '3px solid var(--bs-danger)'
                      }}
                    >
                      <IconComponent 
                        size={window.innerWidth < 768 ? 32 : 40}
                        style={{ color: 'var(--bs-danger)' }}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h4 
                    className={isDark ? "mb-2 mb-md-3 text-light" : "mb-2 mb-md-3"}
                    style={{ 
                      color: isDark ? undefined : '#2d3748', 
                      fontWeight: '700',
                      fontSize: 'clamp(1.1rem, 3vw, 1.5rem)'
                    }}
                  >
                    {t(`howItWorks.steps.${step.key}.title`)}
                  </h4>

                  {/* Description */}
                  <p 
                    className={isDark ? "mb-0 text-light" : "mb-0"}
                    style={{ 
                      color: isDark ? undefined : '#4a5568',
                      opacity: isDark ? 0.75 : 1,
                      lineHeight: '1.7',
                      fontSize: 'clamp(0.9rem, 2vw, 1rem)'
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