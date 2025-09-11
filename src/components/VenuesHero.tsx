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
      className="position-relative d-flex align-items-center justify-content-center text-light px-4 bg-dark"
      style={{
        minHeight: '100vh',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/lovable-uploads/bef17c67-6c7c-42bd-ad1a-2e9df5f98525.png')`,
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
          Transform Your Venue Into an Interactive Mystery Experience
        </h1>
        <p className="lead text-light mb-5 mx-auto fs-4" style={{ maxWidth: '800px', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
          Create custom detective cases tailored to your exact location. Turn your Airbnb, hotel, or restaurant into an unforgettable mystery adventure that keeps guests coming back.
        </p>
        <div className="d-flex gap-3 justify-content-center flex-wrap mb-4">
          <button 
            onClick={scrollToContact}
            className="btn btn-danger btn-lg px-5 py-3 rounded-pill shadow-lg fw-semibold fs-5"
          >
            Start 7-Day Free Trial
          </button>
          <button 
            className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill shadow-lg fw-semibold fs-5"
          >
            See How It Works
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