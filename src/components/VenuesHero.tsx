const VenuesHero = () => {
  const scrollToContact = () => {
    const contactSection = document.querySelector('[data-section="contact"]');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section 
      className="position-relative d-flex align-items-center justify-content-center text-white px-4"
      style={{
        minHeight: '100vh',
        backgroundImage: `url('/lovable-uploads/bef17c67-6c7c-42bd-ad1a-2e9df5f98525.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="position-absolute top-0 start-0 w-100 h-100 hero-overlay"></div>
      
      <div className="position-relative container text-center" style={{ zIndex: '10' }}>
        <h1 
          className="fw-bold text-light mb-4" 
          style={{ 
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            fontSize: 'clamp(1.2rem, 4.5vw, 4rem)',
            lineHeight: '1.1'
          }}
        >
          Transform Your Venue Into a Crime Scene
        </h1>
        <p className="lead text-light mb-5 mx-auto" style={{ maxWidth: '700px', textShadow: '1px 1px 2px rgba(0,0,0,0.8)', fontSize: '1.25rem' }}>
          Exclusive detective cases tailored to your location. Turn your Airbnb, hotel, or restaurant into an unforgettable mystery adventure that guests will rave about.
        </p>
        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <button 
            onClick={scrollToContact}
            className="btn btn-danger btn-lg px-5 py-3 rounded-pill shadow-lg fw-semibold"
            style={{ fontSize: '1.1rem' }}
          >
            Get Started
          </button>
          <button 
            className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill shadow-lg fw-semibold"
            style={{ fontSize: '1.1rem' }}
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default VenuesHero;