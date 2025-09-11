const VenuesCTA = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-5 bg-dark text-light d-flex align-items-center" style={{ minHeight: '100vh' }} data-section="contact">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-lg-8">
            <h2 className="display-4 fw-bold text-primary-custom mb-4">
              Ready to Transform Your Venue?
            </h2>
            <p className="lead mb-5">
              Join successful venue owners who've elevated their guest experience with custom mystery adventures. 
              Start your free trial today and see the difference interactive entertainment makes.
            </p>
            
            <div className="card bg-secondary border-danger border-2 mb-5 mx-auto" style={{ maxWidth: '600px' }}>
              <div className="card-body p-4">
                <h4 className="text-primary-custom mb-3">Start Your Free Trial</h4>
                <div className="row g-3 align-items-center">
                  <div className="col-md-8">
                    <input 
                      type="email" 
                      className="form-control form-control-lg bg-dark text-light border-secondary" 
                      placeholder="Enter your email address"
                    />
                  </div>
                  <div className="col-md-4">
                    <button 
                      className="btn btn-danger btn-lg w-100 fw-semibold"
                      onClick={scrollToTop}
                    >
                      Start Trial
                    </button>
                  </div>
                </div>
                <p className="text-light opacity-75 small mt-3 mb-0">
                  7-day free trial • Custom case in 24 hours • Cancel anytime
                </p>
              </div>
            </div>

            <div className="row g-4 mb-5">
              <div className="col-md-4">
                <div className="text-center">
                  <i className="bi bi-clock text-danger fs-1 mb-3"></i>
                  <h5 className="text-primary-custom">Quick Setup</h5>
                  <p className="text-light">Custom case ready within 24 hours</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="text-center">
                  <i className="bi bi-award text-danger fs-1 mb-3"></i>
                  <h5 className="text-primary-custom">Premium Quality</h5>
                  <p className="text-light">Professionally crafted mystery experiences</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="text-center">
                  <i className="bi bi-headset text-danger fs-1 mb-3"></i>
                  <h5 className="text-primary-custom">24/7 Support</h5>
                  <p className="text-light">Always here to help you succeed</p>
                </div>
              </div>
            </div>
            
            <div className="border-top border-secondary pt-4">
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