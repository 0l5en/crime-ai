const GuestBenefits = () => {
  const benefits = [
    {
      icon: "🎯",
      title: "Immersive Location-Based Experience",
      description: "Solve mysteries in real locations, making every room and corner part of the adventure."
    },
    {
      icon: "🔐",
      title: "Exclusive Access",
      description: "Each case is unique to your venue - guests can't experience this mystery anywhere else."
    },
    {
      icon: "🎮",
      title: "Interactive Entertainment",
      description: "Turn downtime into adventure time with engaging puzzles and storylines."
    },
    {
      icon: "📱",
      title: "Easy Access",
      description: "Simply scan a QR code to start the adventure - no downloads or complicated setup required."
    }
  ];

  return (
    <section className="py-5 bg-secondary text-light">
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <h2 className="display-4 fw-bold text-primary-custom mb-4">What Guests Love</h2>
            <p className="lead">
              Your guests get an unforgettable experience that transforms their stay into an adventure they'll talk about for years.
            </p>
          </div>
        </div>

        <div className="row g-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="col-md-6">
              <div className="card bg-secondary border-dark card-hover h-100">
                <div className="card-body d-flex">
                  <div className="display-4 text-danger me-4 flex-shrink-0">{benefit.icon}</div>
                  <div>
                    <h5 className="card-title text-primary-custom">{benefit.title}</h5>
                    <p className="card-text text-light">{benefit.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row mt-5">
          <div className="col-lg-8 mx-auto text-center">
            <div className="card bg-dark border-primary">
              <div className="card-body py-4">
                <h4 className="text-primary-custom mb-3">"An Unforgettable Experience!"</h4>
                <p className="text-light mb-0">
                  "We solved a murder mystery that took place right in our Airbnb! Every room had clues, 
                  and we felt like real detectives. This made our weekend getaway absolutely incredible."
                </p>
                <small className="text-muted d-block mt-2">- Sarah M., Guest Review</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuestBenefits;