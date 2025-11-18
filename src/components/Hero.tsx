import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation('home');
  
  const scrollToCases = () => {
    const casesSection = document.querySelector('[data-section="cases"]');
    if (casesSection) {
      const yOffset = -63; // Header height offset
      const y = casesSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      className="position-relative d-flex align-items-center justify-content-center text-white px-4"
      style={{
        height: 'calc(100vh - 63px)',
        backgroundImage: `url('/lovable-uploads/bef17c67-6c7c-42bd-ad1a-2e9df5f98525.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="position-absolute top-0 start-0 w-100 h-100 hero-overlay"></div>
      
      <div className="position-relative container text-center" style={{ zIndex: '10' }}>
        <h1 
          className="fw-bold text-white mb-4" 
          style={{ 
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
            lineHeight: '1.2'
          }}
        >
          {t('hero.title')}
        </h1>
        <p className="lead text-white mb-5 mx-auto" style={{ maxWidth: '90%', textShadow: '1px 1px 2px rgba(0,0,0,0.8)', fontSize: 'clamp(1rem, 3vw, 1.25rem)' }}>
          {t('hero.subtitle')}
        </p>
        <button 
          onClick={scrollToCases}
          className="btn btn-danger btn-lg px-5 py-3 rounded-pill shadow-lg fw-semibold"
          style={{ fontSize: '1.1rem' }}
        >
          {t('hero.exploreCases')}
        </button>
      </div>
    </section>
  );
};

export default Hero;
