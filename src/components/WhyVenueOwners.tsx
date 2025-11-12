import { useTranslation } from 'react-i18next';
import { MapPin, Smile, TrendingUp } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

const WhyVenueOwners = () => {
  const { t } = useTranslation('venues');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className="py-4 py-md-5 d-flex align-items-center" style={{ 
      minHeight: '100vh', 
      backgroundColor: isDark ? '#1a1a2e' : '#f7fafc' 
    }}>
      <div className="container px-3">
        <div className="row justify-content-center mb-4 mb-md-5">
          <div className="col-lg-10 text-center">
            <h2 className={isDark ? "fw-bold mb-3 mb-md-4 text-light" : "fw-bold mb-3 mb-md-4"} style={{ 
              color: isDark ? undefined : '#2d3748',
              fontSize: 'clamp(1.5rem, 5vw, 3rem)'
            }}>
              {t('why.title')}
            </h2>
            <p className={isDark ? "px-2 text-light" : "px-2"} style={{ 
              color: isDark ? undefined : '#4a5568',
              opacity: isDark ? 0.75 : 1,
              fontSize: 'clamp(0.9rem, 2vw, 1.15rem)',
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
                  border: isDark ? '2px solid rgba(255, 255, 255, 0.1)' : '2px solid rgba(203, 25, 28, 0.2)',
                  borderRadius: '20px',
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'white',
                  transition: 'all 0.3s ease',
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
                }}>
                  <div
                    className="mx-auto mb-3 mb-md-4 d-flex align-items-center justify-content-center"
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
                  <h4 className={isDark ? "mb-2 mb-md-3 text-light" : "mb-2 mb-md-3"} style={{ 
                    color: isDark ? undefined : '#2d3748', 
                    fontWeight: '700',
                    fontSize: 'clamp(1.1rem, 3vw, 1.5rem)'
                  }}>
                    {t(`why.benefits.${benefit.key}.title`)}
                  </h4>
                  <p className={isDark ? "mb-0 text-light" : "mb-0"} style={{ 
                    color: isDark ? undefined : '#4a5568',
                    opacity: isDark ? 0.75 : 1,
                    lineHeight: '1.7',
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)'
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
