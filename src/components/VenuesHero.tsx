import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const VenuesHero = () => {
  const { t } = useTranslation('venues');
  const navigate = useNavigate();
  
  const scrollToContact = () => {
    navigate('/venue-register');
  };

  const scrollToHowItWorks = () => {
    const howItWorksSection = document.querySelector('[data-section="how-it-works"]');
    if (howItWorksSection) {
      howItWorksSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section 
      className="position-relative d-flex align-items-center justify-content-center px-4"
      style={{
        minHeight: '100vh',
        backgroundImage: `linear-gradient(rgba(247, 250, 252, 0.92), rgba(247, 250, 252, 0.92)), url('/lovable-uploads/06bb6f8b-cb6d-42cf-85f7-197f4ec4051b.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container text-center px-3">
        <h1 
          className="fw-bold mb-3 mb-md-4" 
          style={{ 
            color: '#2d3748',
            lineHeight: '1.2',
            fontSize: 'clamp(1.5rem, 4vw, 3.5rem)'
          }}
        >
          {t('hero.title').split('Krimi-Erlebnis').map((part, i, arr) => (
            i < arr.length - 1 ? (
              <span key={i}>
                {part}
                <span style={{ color: 'var(--bs-danger)' }}>Krimi-Erlebnis</span>
              </span>
            ) : part
          ))}
        </h1>
        <p className="lead mb-4 mb-md-5 mx-auto px-2" style={{ 
          maxWidth: '800px', 
          color: '#4a5568',
          fontSize: 'clamp(0.95rem, 2vw, 1.25rem)',
          lineHeight: '1.6'
        }}>
          {t('hero.subtitle')}
        </p>
        <div className="d-flex gap-2 gap-md-3 justify-content-center flex-wrap mb-3 mb-md-4 px-2">
          <button 
            onClick={scrollToContact}
            className="btn btn-danger rounded-pill shadow-lg fw-semibold"
            style={{
              padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2.5rem)',
              fontSize: 'clamp(0.95rem, 2vw, 1.15rem)'
            }}
          >
            {t('hero.cta')}
          </button>
          <button 
            onClick={scrollToHowItWorks}
            className="btn btn-outline-danger rounded-pill shadow fw-semibold"
            style={{
              padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2.5rem)',
              fontSize: 'clamp(0.95rem, 2vw, 1.15rem)'
            }}
          >
            {t('howItWorks.title')}
          </button>
        </div>
        <p className="px-2" style={{ fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)', color: '#718096' }}>
          {t('hero.trial')}
        </p>
      </div>
    </section>
  );
};

export default VenuesHero;