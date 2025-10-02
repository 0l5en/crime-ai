import { MapPin, Smile, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const WhyVenueOwners = () => {
  const { t } = useTranslation('venues');

  return (
    <section className="py-5 bg-dark text-light d-flex align-items-center" style={{ minHeight: '100vh' }}>
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <h2 className="display-4 fw-bold mb-4" style={{ color: 'var(--bs-light)' }}>{t('why.title')}</h2>
            <p className="lead text-light mb-0">
              {t('why.subtitle')}
            </p>
          </div>
        </div>

        <div className="row g-5">
          {[
            { icon: MapPin, key: 'unique' },
            { icon: Smile, key: 'satisfaction' },
            { icon: TrendingUp, key: 'growth' }
          ].map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={index} className="col-md-4">
                <div className="text-center p-4" style={{
                  border: '1px solid var(--bs-border-color)',
                  borderRadius: '12px',
                  backgroundColor: 'transparent',
                  transition: 'all 0.3s ease',
                  height: '100%'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--bs-danger)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--bs-border-color)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}>
                  <div className="mb-4" style={{
                    width: '64px',
                    height: '64px',
                    margin: '0 auto',
                    backgroundColor: 'rgba(203, 25, 28, 0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <IconComponent 
                      size={28} 
                      style={{ color: 'var(--bs-danger)' }}
                    />
                  </div>
                  <h4 className="mb-3" style={{ color: 'var(--bs-light)', fontWeight: '600' }}>
                    {t(`why.benefits.${benefit.key}.title`)}
                  </h4>
                  <p className="text-light mb-0" style={{ 
                    lineHeight: '1.6',
                    fontSize: '0.95rem',
                    opacity: '0.9'
                  }}>
                    {t(`why.benefits.${benefit.key}.description`)}
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

export default WhyVenueOwners;