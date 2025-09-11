const VenuesTestimonials = () => {
  const testimonials = [
    {
      name: "Sarah Mitchell",
      venue: "Seaside Escape Airbnb",
      location: "Monterey, CA",
      rating: 5,
      text: "Our booking rate increased by 40% after adding the custom mystery case. Guests specifically mention it in their 5-star reviews and many book return stays just to try seasonal variations!"
    },
    {
      name: "Marcus Thompson",
      venue: "The Historic Inn",
      location: "Savannah, GA", 
      rating: 5,
      text: "The mystery case perfectly captures our inn's historic charm. It's become our signature amenity - guests often extend their stays to fully enjoy the experience. Worth every penny!"
    },
    {
      name: "Elena Rodriguez",
      venue: "Mountain View Resort",
      location: "Aspen, CO",
      rating: 5,
      text: "Implementation was seamless and the support team was incredible. Our guests love the interactive elements, and we've justified a 25% rate increase. The analytics help us optimize constantly."
    }
  ];

  return (
    <section className="py-5 bg-secondary text-light d-flex align-items-center" style={{ minHeight: '100vh' }}>
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <h2 className="display-4 fw-bold text-primary-custom mb-4">What Venue Owners Say</h2>
            <p className="lead">
              Join hundreds of successful venue owners who've transformed their guest experience.
            </p>
          </div>
        </div>

        <div className="row g-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="col-lg-4">
              <div className="card bg-dark border-0 h-100 card-hover">
                <div className="card-body p-4">
                  <div className="mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <i key={i} className="bi bi-star-fill text-warning me-1"></i>
                    ))}
                  </div>
                  <blockquote className="blockquote mb-4">
                    <p className="text-light mb-0">"{testimonial.text}"</p>
                  </blockquote>
                  <div className="border-top border-danger pt-3">
                    <h6 className="text-primary-custom mb-1 fw-bold">{testimonial.name}</h6>
                    <p className="text-light opacity-75 small mb-1">{testimonial.venue}</p>
                    <p className="text-light opacity-50 small mb-0">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VenuesTestimonials;