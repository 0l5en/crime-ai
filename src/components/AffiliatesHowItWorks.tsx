import { useTranslation } from "react-i18next";
import { UserPlus, Share2, Euro, Network } from "lucide-react";

const AffiliatesHowItWorks = () => {
  const { t } = useTranslation('affiliates');

  const steps = [
    {
      icon: UserPlus,
      titleKey: 'step1.title',
      descriptionKey: 'step1.description',
      color: '#40F99B'
    },
    {
      icon: Share2,
      titleKey: 'step2.title',
      descriptionKey: 'step2.description',
      color: '#2dd4bf'
    },
    {
      icon: Euro,
      titleKey: 'step3.title',
      descriptionKey: 'step3.description',
      color: '#14b8a6'
    },
    {
      icon: Network,
      titleKey: 'step4.title',
      descriptionKey: 'step4.description',
      color: '#0d9488'
    }
  ];

  return (
    <section 
      className="py-5"
      style={{
        background: 'linear-gradient(180deg, #0f1629 0%, #181d35 100%)'
      }}
    >
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-light mb-3">
            {t('howItWorks.title')}
          </h2>
          <p className="lead text-light" style={{ opacity: 0.8 }}>
            {t('howItWorks.subtitle')}
          </p>
        </div>

        <div className="row g-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="col-md-6 col-lg-3">
                <div 
                  className="h-100 p-4 text-center position-relative"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '20px',
                    border: '1px solid rgba(64, 249, 155, 0.2)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = `0 20px 40px rgba(64, 249, 155, 0.2)`;
                    e.currentTarget.style.border = '1px solid rgba(64, 249, 155, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.border = '1px solid rgba(64, 249, 155, 0.2)';
                  }}
                >
                  {/* Step Number */}
                  <div 
                    className="position-absolute"
                    style={{
                      top: '-15px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: step.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '700',
                      fontSize: '1.2rem',
                      color: '#181d35',
                      boxShadow: `0 5px 20px ${step.color}80`
                    }}
                  >
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="mb-4 mt-3">
                    <Icon size={48} style={{ color: step.color }} />
                  </div>

                  {/* Title */}
                  <h4 className="text-light fw-bold mb-3">
                    {t(`howItWorks.${step.titleKey}`)}
                  </h4>

                  {/* Description */}
                  <p className="text-light" style={{ opacity: 0.8, lineHeight: '1.6' }}>
                    {t(`howItWorks.${step.descriptionKey}`)}
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

export default AffiliatesHowItWorks;
