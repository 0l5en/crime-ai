const WhyVenueOwners = () => {
  const benefits = [
    {
      icon: "🏨",
      title: "Increase Bookings",
      description: "Stand out from competitors with unique mystery experiences that guests actively seek out and book."
    },
    {
      icon: "⭐",
      title: "Boost Reviews",
      description: "Create memorable moments that lead to 5-star reviews and word-of-mouth recommendations."
    },
    {
      icon: "💰",
      title: "Premium Pricing",
      description: "Justify higher rates with exclusive entertainment that adds real value to the guest experience."
    }
  ];

  return (
    <section className="py-5 bg-dark text-light">
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <h2 className="display-4 fw-bold text-primary-custom mb-4">Why Venue Owners Choose Us</h2>
            <p className="lead text-light">
              Transform your property into a destination that guests choose for the experience, not just the location.
            </p>
          </div>
        </div>

        <div className="row g-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="col-md-4">
              <div className="card bg-secondary border-0 h-100 card-hover">
                <div className="card-body text-center p-4">
                  <div className="fs-1 mb-3">{benefit.icon}</div>
                  <h4 className="text-primary-custom mb-3">{benefit.title}</h4>
                  <p className="text-light mb-0">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyVenueOwners;