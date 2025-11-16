import { useTranslation } from "react-i18next";
import { RefreshCw, Layers, Infinity, LineChart, Megaphone, Zap } from "lucide-react";

const AffiliatesBenefits = () => {
  const { t } = useTranslation('affiliates');

  const benefits = [
    {
      icon: RefreshCw,
      titleKey: 'recurring.title',
      descriptionKey: 'recurring.description'
    },
    {
      icon: Layers,
      titleKey: 'fiveLevel.title',
      descriptionKey: 'fiveLevel.description'
    },
    {
      icon: Infinity,
      titleKey: 'noLimits.title',
      descriptionKey: 'noLimits.description'
    },
    {
      icon: LineChart,
      titleKey: 'tracking.title',
      descriptionKey: 'tracking.description'
    },
    {
      icon: Megaphone,
      titleKey: 'materials.title',
      descriptionKey: 'materials.description'
    },
    {
      icon: Zap,
      titleKey: 'payouts.title',
      descriptionKey: 'payouts.description'
    }
  ];

  return (
    <section 
      className="py-5"
      style={{
        background: 'linear-gradient(180deg, #181d35 0%, #1a2238 100%)'
      }}
    >
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-light mb-3">
            {t('benefits.title')}
          </h2>
          <p className="lead text-light" style={{ opacity: 0.8 }}>
            {t('benefits.subtitle')}
          </p>
        </div>

        <div className="row g-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="col-md-6 col-lg-4">
                <div 
                  className="h-100 p-4"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '20px',
                    border: '1px solid rgba(64, 249, 155, 0.2)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(64, 249, 155, 0.2)';
                    e.currentTarget.style.border = '1px solid rgba(64, 249, 155, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.border = '1px solid rgba(64, 249, 155, 0.2)';
                  }}
                >
                  <div className="mb-3">
                    <div 
                      className="d-inline-flex p-3"
                      style={{
                        backgroundColor: 'rgba(64, 249, 155, 0.1)',
                        borderRadius: '12px'
                      }}
                    >
                      <Icon size={32} style={{ color: '#40F99B' }} />
                    </div>
                  </div>

                  <h4 className="text-light fw-bold mb-3">
                    {t(`benefits.${benefit.titleKey}`)}
                  </h4>

                  <p className="text-light mb-0" style={{ opacity: 0.8, lineHeight: '1.6' }}>
                    {t(`benefits.${benefit.descriptionKey}`)}
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

export default AffiliatesBenefits;
