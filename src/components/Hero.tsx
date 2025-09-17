
const Hero = () => {
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
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="position-absolute top-0 start-0 w-100 h-100 hero-overlay"></div>
      
      <div className="position-relative container text-center" style={{ zIndex: '10' }}>
        <h1 
          className="fw-bold text-white mb-4" 
          style={{ 
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            fontSize: 'clamp(1.2rem, 4.5vw, 4rem)',
            lineHeight: '1.1',
            whiteSpace: 'nowrap'
          }}
        >
          Unravel the Truth, One Clue at a Time
        </h1>
        <p className="lead text-white mb-5 mx-auto" style={{ maxWidth: '70%', textShadow: '1px 1px 2px rgba(0,0,0,0.8)', fontSize: '1.25rem' }}>
          Dive into a world of mystery and intrigue with our AI-powered interactive detective games. Solve complex cases, interrogate suspects, and uncover hidden secrets.
        </p>
        <button 
          onClick={scrollToCases}
          className="btn btn-danger btn-lg px-5 py-3 rounded-pill shadow-lg fw-semibold"
          style={{ fontSize: '1.1rem' }}
        >
          Explore Cases
        </button>
      </div>
    </section>
  );
};

export default Hero;
