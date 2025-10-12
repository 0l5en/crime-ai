import { MapPin, Smile, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const WhyVenueOwners = () => {
  const { t } = useTranslation('venues');

  return (
    <section className="py-4 py-md-5 bg-dark text-light d-flex align-items-center" style={{ minHeight: '100vh' }}>
      <div className="container px-3">
        <div className="row justify-content-center mb-4 mb-md-5">
          <div className="col-lg-10 text-center">
            <h2 className="fw-bold mb-3 mb-md-4" style={{ 
              color: 'var(--bs-light)',
              fontSize: 'clamp(1.5rem, 5vw, 3rem)'
            }}>
              {t('why.title')}
            </h2>
            <p className="text-light mb-0 px-2" style={{ 
              fontSize: 'clamp(0.9rem, 2vw, 1.15rem)',
              opacity: '0.85',
              lineHeight: '1.7'
            }}>
              {t('why.subtitle')}
            </p>
          </div>
        </div>

        <div className="row g-3 g-md-4 g-lg-5">
          {[
            { icon: MapPin, key: 'unique' },
            { icon: Smile, key: 'satisfaction' },
            { icon: TrendingUp, key: 'growth' }
          ].map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={index} className="col-md-4">
                <div className="text-center h-100" style={{
                  border: '1px solid rgba(203, 25, 28, 0.2)',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.3s ease',
                  padding: 'clamp(1.5rem, 4vw, 3rem)'
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
                }}>
                  <div className="mb-3 mb-md-4" style={{
                    width: 'clamp(60px, 15vw, 80px)',
                    height: 'clamp(60px, 15vw, 80px)',
                    margin: '0 auto',
                    backgroundColor: 'var(--bs-danger)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 20px rgba(203, 25, 28, 0.3)'
                  }}>
                    <IconComponent 
                      size={window.innerWidth < 768 ? 28 : 36}
                      style={{ color: 'white' }}
                    />
                  </div>
                  <h4 className="mb-2 mb-md-3" style={{ 
                    color: 'var(--bs-light)', 
                    fontWeight: '700',
                    fontSize: 'clamp(1.1rem, 3vw, 1.5rem)'
                  }}>
                    {t(`why.benefits.${benefit.key}.title`)}
                  </h4>
                  <p className="text-light mb-0" style={{ 
                    lineHeight: '1.7',
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                    opacity: '0.85'
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