const VenuesCTA = () => {
  return (
    <section 
      className="py-5 text-light d-flex align-items-center" 
      style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #2d4a2e 0%, #1a5f1d 100%)'
      }} 
      data-section="contact"
    >
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-lg-8">
            <h1 className="display-3 fw-bold mb-4" style={{ color: 'white' }}>
              Transform Your <span style={{ color: '#90EE90' }}>Venue</span> Into a <span style={{ color: '#90EE90' }}>Mystery Adventure</span>!
            </h1>
            
            <p className="lead mb-4 text-light" style={{ fontSize: '1.25rem' }}>
              Elevate your venue with our <span style={{ color: '#90EE90' }}>AI-powered</span> detective experiences. Our algorithm creates custom 
              mysteries tailored to your space, driving social media shares and repeat visits.
            </p>
            
            <h3 className="mb-5 text-light fw-normal">
              Try risk-free for 30 days.
            </h3>

            {/* Feature Benefits */}
            <div className="row justify-content-center mb-5">
              <div className="col-md-4 mb-3">
                <div className="d-flex align-items-center justify-content-center">
                  <i className="bi bi-check-circle-fill text-success me-3" style={{ fontSize: '1.5rem' }}></i>
                  <span className="text-light fs-5">AI-powered cases</span>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="d-flex align-items-center justify-content-center">
                  <i className="bi bi-check-circle-fill text-success me-3" style={{ fontSize: '1.5rem' }}></i>
                  <span className="text-light fs-5">30-day free trial</span>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="d-flex align-items-center justify-content-center">
                  <i className="bi bi-check-circle-fill text-success me-3" style={{ fontSize: '1.5rem' }}></i>
                  <span className="text-light fs-5">Cancel anytime</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="d-flex flex-column flex-md-row gap-3 justify-content-center mb-5">
              <button 
                className="btn btn-success btn-lg px-5 py-3 fw-semibold" 
                style={{ 
                  backgroundColor: '#90EE90', 
                  borderColor: '#90EE90',
                  color: '#1a5f1d',
                  fontSize: '1.1rem',
                  borderRadius: '12px'
                }}
              >
                Register as Venue Owner
              </button>
              <button 
                className="btn btn-outline-light btn-lg px-5 py-3 fw-semibold d-flex align-items-center justify-content-center gap-2" 
                style={{ 
                  fontSize: '1.1rem',
                  borderRadius: '12px',
                  borderColor: '#90EE90',
                  color: '#90EE90'
                }}
              >
                Contact Us
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>
            
            <div className="border-top border-light opacity-25 pt-4">
              <p className="text-light opacity-75 mb-2">
                <strong>Questions?</strong> We're here to help!
              </p>
              <p className="text-light opacity-75">
                <i className="bi bi-envelope me-2"></i>
                venues@detectivesgame.com
                <span className="mx-3">|</span>
                <i className="bi bi-telephone me-2"></i>
                +1 (555) 123-CASE
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VenuesCTA;