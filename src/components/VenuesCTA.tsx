const VenuesCTA = () => {
  return (
    <section className="py-5 bg-dark text-light" data-section="contact">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h2 className="display-4 fw-bold text-primary-custom mb-4">
              Ready to Transform Your Venue?
            </h2>
            <p className="lead mb-5">
              Join the growing community of venue owners who are delighting guests with custom mystery experiences. 
              Contact us today to get your exclusive case created.
            </p>

            <div className="row g-4 mb-5">
              <div className="col-md-4">
                <div className="card bg-dark border-secondary h-100">
                  <div className="card-body text-center">
                    <h5 className="text-primary-custom">Quick Setup</h5>
                    <p className="text-light small mb-0">Get your case within 2-3 business days</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card bg-dark border-secondary h-100">
                  <div className="card-body text-center">
                    <h5 className="text-primary-custom">Professional Quality</h5>
                    <p className="text-light small mb-0">Expert writers craft engaging storylines</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card bg-dark border-secondary h-100">
                  <div className="card-body text-center">
                    <h5 className="text-primary-custom">Ongoing Support</h5>
                    <p className="text-light small mb-0">We're here to help maximize your success</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <button className="btn btn-danger btn-lg px-5 py-3 rounded-pill shadow-lg fw-semibold">
                Get Your Custom Case
              </button>
              <button className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill shadow-lg fw-semibold">
                Request Demo
              </button>
            </div>

            <div className="mt-4">
              <small className="text-muted">
                Questions? Email us at venues@detectivesgame.com or call +1 (555) 123-CASE
              </small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VenuesCTA;