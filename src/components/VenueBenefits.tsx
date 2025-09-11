const VenueBenefits = () => {
  const benefits = [
    {
      icon: "⭐",
      title: "Unique Selling Proposition",
      description: "Stand out from competitors with an exclusive experience that no other property can offer."
    },
    {
      icon: "📈",
      title: "Increased Bookings",
      description: "Attract adventure-seeking guests who choose your venue specifically for the mystery experience."
    },
    {
      icon: "💬",
      title: "Better Reviews",
      description: "Guests love unique experiences and will leave glowing reviews about their unforgettable stay."
    },
    {
      icon: "🕒",
      title: "Longer Stays",
      description: "Engaging mysteries encourage guests to extend their visits to fully enjoy the experience."
    },
    {
      icon: "💰",
      title: "Premium Pricing",
      description: "Justify higher rates by offering an exclusive, immersive experience that adds real value."
    },
    {
      icon: "📢",
      title: "Word-of-Mouth Marketing",
      description: "Memorable experiences create natural ambassadors who recommend your venue to friends."
    }
  ];

  return (
    <section className="py-5 bg-dark text-light">
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <h2 className="display-4 fw-bold text-primary-custom mb-4">Benefits for Venue Owners</h2>
            <p className="lead">
              Transform your property into a profit-generating entertainment destination that guests will never forget.
            </p>
          </div>
        </div>

        <div className="row g-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="card bg-dark border-secondary card-hover h-100">
                <div className="card-body">
                  <div className="display-4 text-danger mb-3">{benefit.icon}</div>
                  <h5 className="card-title text-primary-custom">{benefit.title}</h5>
                  <p className="card-text text-light">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VenueBenefits;