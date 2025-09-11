const VenuesPricing = () => {
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
    <section className="py-5 bg-secondary text-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h2 className="display-4 fw-bold text-primary-custom mb-4">Simple, Transparent Pricing</h2>
            <p className="lead mb-5">
              Start your free trial today. No setup fees, no long-term contracts.
            </p>
            
            <div className="card bg-dark border-danger border-2 mx-auto" style={{ maxWidth: '500px' }}>
              <div className="card-body p-5 text-center">
                <div className="mb-3">
                  <span className="badge bg-danger fs-6 px-3 py-2 rounded-pill">Most Popular</span>
                </div>
                <h3 className="text-primary-custom mb-3">Venue Mystery Plan</h3>
                <div className="mb-4">
                  <span className="display-4 fw-bold text-light">$9.99</span>
                  <span className="text-light opacity-75">/month</span>
                </div>
                <div className="mb-4">
                  <div className="bg-danger text-white py-2 px-3 rounded-pill mb-3">
                    <strong>7-Day Free Trial</strong>
                  </div>
                  <p className="text-light opacity-75 small">
                    Then $9.99/month • Cancel anytime
                  </p>
                </div>
                <ul className="list-unstyled text-start mb-4">
                  <li className="mb-2"><i className="bi bi-check-circle-fill text-danger me-2"></i>Custom mystery case for your venue</li>
                  <li className="mb-2"><i className="bi bi-check-circle-fill text-danger me-2"></i>Unique QR code access</li>
                  <li className="mb-2"><i className="bi bi-check-circle-fill text-danger me-2"></i>Guest engagement analytics</li>
                  <li className="mb-2"><i className="bi bi-check-circle-fill text-danger me-2"></i>Case updates & seasonal variants</li>
                  <li className="mb-2"><i className="bi bi-check-circle-fill text-danger me-2"></i>24/7 customer support</li>
                </ul>
                <button 
                  onClick={scrollToContact}
                  className="btn btn-danger btn-lg w-100 rounded-pill py-3 fw-semibold"
                >
                  Start Free Trial
                </button>
                <p className="text-light opacity-50 small mt-3 mb-0">
                  No credit card required for trial
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VenuesPricing;