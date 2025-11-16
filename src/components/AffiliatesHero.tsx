import { useTranslation } from "react-i18next";
import { TrendingUp } from "lucide-react";

const AffiliatesHero = () => {
  const { t } = useTranslation('affiliates');

  return (
    <section 
      className="py-5"
      style={{
        background: 'linear-gradient(135deg, #181d35 0%, #1a2744 100%)',
        minHeight: 'calc(100vh - 70px)',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className="animate-fade-in">
              <h1 
                className="display-4 fw-bold text-light mb-4"
                style={{
                  lineHeight: '1.2',
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)'
                }}
              >
                {t('hero.title')}
              </h1>
              <p 
                className="lead text-light mb-4"
                style={{
                  opacity: 0.9,
                  fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                  lineHeight: '1.6'
                }}
              >
                {t('hero.subtitle')}
              </p>
              <button
                onClick={() => {
                  const calculatorSection = document.getElementById('calculator-section');
                  if (calculatorSection) {
                    const yOffset = -70; // Header height offset
                    const y = calculatorSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    
                    window.scrollTo({
                      top: y,
                      behavior: 'smooth'
                    });
                  }
                }}
                className="btn btn-lg px-5 py-3 d-inline-flex align-items-center gap-2"
                style={{
                  backgroundColor: '#40F99B',
                  color: '#181d35',
                  border: 'none',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  boxShadow: '0 10px 30px rgba(64, 249, 155, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(64, 249, 155, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(64, 249, 155, 0.3)';
                }}
              >
                <TrendingUp size={24} />
                {t('hero.cta')}
              </button>
            </div>
          </div>
          
          <div className="col-lg-6">
            <div 
              className="p-4 animate-fade-in"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                border: '1px solid rgba(64, 249, 155, 0.2)'
              }}
            >
              {/* Animated Bar Chart */}
              <div className="d-flex flex-column gap-3">
                {[
                  { level: 1, amount: '€0.50', height: '100%', delay: '0s' },
                  { level: 2, amount: '€0.40', height: '80%', delay: '0.1s' },
                  { level: 3, amount: '€0.30', height: '60%', delay: '0.2s' },
                  { level: 4, amount: '€0.20', height: '40%', delay: '0.3s' },
                  { level: 5, amount: '€0.10', height: '20%', delay: '0.4s' }
                ].map((item) => (
                  <div key={item.level} className="d-flex align-items-center gap-3">
                    <span 
                      className="text-light"
                      style={{ 
                        minWidth: '80px',
                        fontWeight: '600',
                        fontSize: '0.9rem'
                      }}
                    >
                      Level {item.level}
                    </span>
                    <div 
                      className="flex-grow-1"
                      style={{
                        height: '40px',
                        background: 'linear-gradient(90deg, #40F99B, #2dd4bf)',
                        borderRadius: '8px',
                        width: item.height,
                        animation: `scaleInX 0.6s ease-out ${item.delay} both`,
                        boxShadow: '0 4px 15px rgba(64, 249, 155, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingRight: '1rem'
                      }}
                    >
                      <span 
                        style={{ 
                          color: '#181d35',
                          fontWeight: '700',
                          fontSize: '1rem'
                        }}
                      >
                        {item.amount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>
        {`
          @keyframes scaleInX {
            from {
              width: 0;
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}
      </style>
    </section>
  );
};

export default AffiliatesHero;
