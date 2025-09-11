const VenuesCTA = () => {
  return (
    <section 
      className="py-5 bg-dark text-light d-flex align-items-center" 
      style={{ minHeight: '100vh' }} 
      data-section="contact"
    >
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-lg-8">
            <h1 className="display-3 fw-bold mb-4 text-white">
              Transform Your <span className="text-primary-custom">Venue</span> Into a <span className="text-primary-custom">Mystery Adventure</span>!
            </h1>
            
            <p className="lead mb-4 text-light" style={{ fontSize: '1.25rem' }}>
              Elevate your venue with our <span className="text-primary-custom">AI-powered</span> detective experiences. Our algorithm creates custom 
              mysteries tailored to your space, driving social media shares and repeat visits.
            </p>
            
            <h3 className="mb-5 text-light fw-normal">
              Try risk-free for 7 days.
            </h3>

            {/* Feature Benefits */}
            <div className="row justify-content-center mb-5">
              <div className="col-md-4 mb-3">
                <div className="d-flex align-items-center justify-content-center">
                  <i className="bi bi-check-circle-fill text-primary-custom me-3" style={{ fontSize: '1.5rem' }}></i>
                  <span className="text-light fs-5">AI-powered cases</span>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="d-flex align-items-center justify-content-center">
                  <i className="bi bi-check-circle-fill text-primary-custom me-3" style={{ fontSize: '1.5rem' }}></i>
                  <span className="text-light fs-5">7-day free trial</span>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="d-flex align-items-center justify-content-center">
                  <i className="bi bi-check-circle-fill text-primary-custom me-3" style={{ fontSize: '1.5rem' }}></i>
                  <span className="text-light fs-5">Cancel anytime</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
              <button 
                className="btn btn-danger btn-lg px-5 py-3 fw-semibold" 
                style={{ 
                  fontSize: '1.1rem',
                  borderRadius: '12px'
                }}
              >
                Register as Venue Owner
              </button>
              <button 
                className="btn btn-outline-danger btn-lg px-5 py-3 fw-semibold d-flex align-items-center justify-content-center gap-2" 
                style={{ 
                  fontSize: '1.1rem',
                  borderRadius: '12px'
                }}
              >
                Contact Us
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VenuesCTA;