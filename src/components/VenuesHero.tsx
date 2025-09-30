import { useTranslation } from 'react-i18next';

const VenuesHero = () => {
  const { t } = useTranslation('venues');
  
  const scrollToContact = () => {
    const contactSection = document.querySelector('[data-section="contact"]');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
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
      className="position-relative d-flex align-items-center justify-content-center text-light px-4 bg-dark"
      style={{
        minHeight: '100vh',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/lovable-uploads/06bb6f8b-cb6d-42cf-85f7-197f4ec4051b.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container text-center">
        <h1 
          className="display-2 fw-bold text-light mb-4" 
          style={{ 
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            lineHeight: '1.1'
          }}
        >
          {t('hero.title')}
        </h1>
        <p className="lead text-light mb-5 mx-auto fs-4" style={{ maxWidth: '800px', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
          {t('hero.subtitle')}
        </p>
        <div className="d-flex gap-3 justify-content-center flex-wrap mb-4">
          <button 
            onClick={scrollToContact}
            className="btn btn-danger btn-lg px-5 py-3 rounded-pill shadow-lg fw-semibold fs-5"
          >
            {t('hero.cta')}
          </button>
          <button 
            onClick={scrollToHowItWorks}
            className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill shadow-lg fw-semibold fs-5"
          >
            {t('howItWorks.title')}
          </button>
        </div>
        <p className="text-light opacity-75">
          <small>7-day free trial • Custom case in 24 hours • Then $9.99/month • Cancel anytime</small>
        </p>
      </div>
    </section>
  );
};

export default VenuesHero;