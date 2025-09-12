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
    "Custom mystery case for your venue",
    "Unique QR code access", 
    "Guest engagement analytics",
    "Case updates & seasonal variants",
    "24/7 customer support"
  ];

  return (
    <section className="py-5 bg-dark text-light d-flex align-items-center" style={{ minHeight: '100vh' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h2 className="display-4 fw-bold mb-4" style={{ color: 'var(--bs-light)' }}>Simple, Transparent Pricing</h2>
            <p className="lead mb-5 text-light" style={{ opacity: '0.9' }}>
              Start your free trial today. No setup fees, no long-term contracts.
            </p>
            
            <div className="mx-auto" style={{ maxWidth: '500px' }}>
              <div 
                className="p-5 text-center position-relative"
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
                <div className="mb-3">
                  <span 
                    className="px-3 py-2 rounded-pill fw-semibold"
                    style={{ 
                      backgroundColor: 'var(--bs-danger)',
                      color: 'white',
                      fontSize: '0.9rem'
                    }}
                  >
                    Most Popular
                  </span>
                </div>
                
                <h3 className="mb-3" style={{ color: 'var(--bs-light)', fontWeight: '600' }}>
                  Venue Mystery Plan
                </h3>
                
                <div className="mb-4">
                  <span className="display-4 fw-bold text-light">$9.99</span>
                  <span className="text-light" style={{ opacity: '0.7' }}>/month</span>
                </div>
                
                <div className="mb-4">
                  <div 
                    className="py-2 px-3 rounded-pill mb-3 fw-semibold"
                    style={{ backgroundColor: 'rgba(203, 25, 28, 0.2)', color: 'var(--bs-danger)', border: '1px solid var(--bs-danger)' }}
                  >
                    7-Day Free Trial
                  </div>
                  <p className="text-light small" style={{ opacity: '0.7' }}>
                    Then $9.99/month • Cancel anytime
                  </p>
                </div>
                
                <ul className="list-unstyled text-start mb-4">
                  {features.map((feature, index) => (
                    <li key={index} className="mb-3 d-flex align-items-center">
                      <div 
                        className="me-3 rounded-circle d-flex align-items-center justify-content-center"
                        style={{ 
                          width: '24px', 
                          height: '24px', 
                          backgroundColor: 'rgba(203, 25, 28, 0.2)' 
                        }}
                      >
                        <Check size={14} style={{ color: 'var(--bs-danger)' }} />
                      </div>
                      <span className="text-light" style={{ fontSize: '0.95rem' }}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={scrollToContact}
                  className="w-100 py-3 fw-semibold d-flex align-items-center justify-content-center gap-2"
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
                  <CreditCard size={20} />
                  Start Free Trial
                </button>
                
                <p className="text-light small mt-3 mb-0" style={{ opacity: '0.6' }}>
                  Custom case delivered within 24 hours
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