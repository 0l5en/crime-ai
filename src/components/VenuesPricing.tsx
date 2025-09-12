import { Check, CreditCard } from 'lucide-react';

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

  const features = [
    "Exclusive custom detective case set in your venue",
    "Unlimited guest access to your venue case",
    "Dedicated venue profile with QR code", 
    "Personalized referral system",
    "Ability to make your case public for marketing",
    "Monthly case performance analytics",
    "Priority customer support"
  ];

  return (
    <section className="py-5 bg-dark text-light d-flex align-items-center" style={{ minHeight: '100vh' }}>
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-10 text-center">
            <h2 className="display-4 fw-bold mb-4" style={{ color: 'var(--bs-light)' }}>Simple, Transparent Pricing</h2>
            <p className="lead mb-5 text-light" style={{ opacity: '0.9' }}>
              Affordable monthly subscription with a risk-free trial period
            </p>
          </div>
        </div>

        <div className="row justify-content-center align-items-start">
          {/* Left Side - Pricing Card */}
          <div className="col-lg-5 mb-4">
            <div 
              className="p-4 text-center"
              style={{
                backgroundColor: 'var(--bs-danger)',
                borderRadius: '16px',
                color: 'white'
              }}
            >
              <h3 className="fw-bold mb-3" style={{ fontSize: '1.5rem' }}>
                Venue Owner Plan
              </h3>
              
              <div className="mb-3">
                <span className="display-4 fw-bold">$9.99</span>
                <span className="fs-5"> /month</span>
              </div>
              
              <p className="mb-0" style={{ opacity: '0.9' }}>
                After 7-day free trial
              </p>
            </div>

            {/* Description Section */}
            <div className="mt-5">
              <h4 className="fw-bold mb-3" style={{ color: 'var(--bs-light)' }}>
                Enhance Your Venue's Experience
              </h4>
              <p className="text-light" style={{ opacity: '0.9', lineHeight: '1.7' }}>
                Transform your property into an interactive adventure that guests will remember and share. 
                Our custom detective cases provide a unique experience that sets your venue apart from the competition.
              </p>
              <p className="text-light" style={{ opacity: '0.9', lineHeight: '1.7' }}>
                Ideal for hotels, vacation rentals, restaurants, cafes, museums, and other visitor attractions. 
                Try it risk-free with our 7-day trial to see the impact on guest satisfaction and engagement.
              </p>
            </div>
          </div>

          {/* Right Side - Features and CTA */}
          <div className="col-lg-5 offset-lg-1">
            <div className="mb-4">
              <h5 className="fw-bold mb-4" style={{ color: 'var(--bs-light)' }}>
                Includes:
              </h5>
              
              <ul className="list-unstyled">
                {features.map((feature, index) => (
                  <li key={index} className="mb-3 d-flex align-items-start">
                    <div 
                      className="me-3 mt-1 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{ 
                        width: '20px', 
                        height: '20px', 
                        backgroundColor: 'var(--bs-danger)' 
                      }}
                    >
                      <Check size={12} style={{ color: 'white' }} />
                    </div>
                    <span className="text-light" style={{ fontSize: '0.95rem', opacity: '0.9' }}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <button 
              onClick={scrollToContact}
              className="w-100 py-3 fw-semibold mb-3"
              style={{
                backgroundColor: 'var(--bs-danger)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.1rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#a8161a';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bs-danger)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Start Your Free Trial
            </button>
            
            <p className="text-light small text-center mb-0" style={{ opacity: '0.7' }}>
              No long-term commitment. Cancel anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VenuesPricing;