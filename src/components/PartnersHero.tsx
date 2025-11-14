import { Award } from "lucide-react";
import { useTranslation } from "react-i18next";

const PartnersHero = () => {
  const { t } = useTranslation('partners');

  return (
    <section 
      className="py-5"
      style={{
        background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary-variant)) 100%)',
      }}
    >
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-lg-8 mx-auto text-center">
            <div className="d-flex justify-content-center mb-4">
              <div 
                className="d-inline-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: '80px',
                  height: '80px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Award size={40} className="text-danger" />
              </div>
            </div>
            <h1 className="display-4 fw-bold mb-4 text-light">
              {t('hero.title')}
            </h1>
            <p className="lead mb-4 text-light opacity-75" style={{ fontSize: '1.1rem' }}>
              {t('hero.subtitle')}
            </p>
            <div 
              className="alert d-inline-block px-4 py-3"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                border: 'none'
              }}
            >
              <p className="mb-0" style={{ 
                fontSize: '0.6125rem',
                color: 'var(--bs-danger)'
              }}>
                <strong>{t('hero.criteria')}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersHero;
