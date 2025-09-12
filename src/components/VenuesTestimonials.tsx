import { Star, Quote } from 'lucide-react';

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
    <section className="py-5 bg-dark text-light d-flex align-items-center" style={{ minHeight: '100vh' }}>
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <h2 className="display-4 fw-bold mb-4" style={{ color: 'var(--bs-light)' }}>What Venue Owners Say</h2>
            <p className="lead text-light" style={{ opacity: '0.9' }}>
              Join hundreds of successful venue owners who've transformed their guest experience.
            </p>
          </div>
        </div>

        <div className="row g-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="col-lg-4">
              <div 
                className="p-4 h-100 position-relative"
                style={{
                  border: '1px solid var(--bs-border-color)',
                  borderRadius: '16px',
                  backgroundColor: 'transparent',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--bs-danger)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(203, 25, 28, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--bs-border-color)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Quote Icon */}
                <div className="mb-3">
                  <div
                    className="d-inline-flex align-items-center justify-content-center"
                    style={{
                      width: '48px',
                      height: '48px',
                      backgroundColor: 'rgba(203, 25, 28, 0.1)',
                      borderRadius: '50%'
                    }}
                  >
                    <Quote size={24} style={{ color: 'var(--bs-danger)' }} />
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-3 d-flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      style={{ color: '#ffc107', fill: '#ffc107' }}
                      className="me-1"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="mb-4">
                  <p 
                    className="text-light mb-0" 
                    style={{ 
                      fontStyle: 'italic', 
                      lineHeight: '1.6',
                      fontSize: '0.95rem'
                    }}
                  >
                    "{testimonial.text}"
                  </p>
                </blockquote>

                {/* Author Info */}
                <div 
                  className="pt-3 mt-auto"
                  style={{ borderTop: '1px solid var(--bs-danger)' }}
                >
                  <h6 
                    className="mb-1 fw-bold" 
                    style={{ color: 'var(--bs-light)' }}
                  >
                    {testimonial.name}
                  </h6>
                  <p 
                    className="text-light small mb-1" 
                    style={{ opacity: '0.8' }}
                  >
                    {testimonial.venue}
                  </p>
                  <p 
                    className="text-light small mb-0" 
                    style={{ opacity: '0.6' }}
                  >
                    {testimonial.location}
                  </p>
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