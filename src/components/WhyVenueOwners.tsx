import { MapPin, Smile, TrendingUp } from 'lucide-react';

const WhyVenueOwners = () => {
  const benefits = [
    {
      icon: MapPin,
      title: "Unique Local Experience",
      description: "Transform your property into the scene of an immersive mystery that showcases its unique features and local character."
    },
    {
      icon: Smile,
      title: "Guest Satisfaction", 
      description: "Provide a memorable activity that makes your venue stand out in reviews and keeps guests coming back for more adventures."
    },
    {
      icon: TrendingUp,
      title: "Business Growth",
      description: "Attract new clientele, encourage longer stays, and create an additional revenue stream with premium mystery experiences."
    }
  ];

  return (
    <section className="py-5 bg-dark text-light d-flex align-items-center" style={{ minHeight: '100vh' }}>
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <h2 className="display-4 fw-bold mb-4" style={{ color: 'var(--bs-light)' }}>Why Venue Owners Choose Us</h2>
            <p className="lead text-light mb-0">
              Join hundreds of property owners already delighting their guests with custom detective mysteries.
            </p>
          </div>
        </div>

        <div className="row g-5">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={index} className="col-md-4">
                <div className="text-center p-4" style={{
                  border: '1px solid var(--bs-border-color)',
                  borderRadius: '12px',
                  backgroundColor: 'transparent',
                  transition: 'all 0.3s ease',
                  height: '100%'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--bs-danger)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--bs-border-color)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}>
                  <div className="mb-4" style={{
                    width: '64px',
                    height: '64px',
                    margin: '0 auto',
                    backgroundColor: 'rgba(203, 25, 28, 0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <IconComponent 
                      size={28} 
                      style={{ color: 'var(--bs-danger)' }}
                    />
                  </div>
                  <h4 className="mb-3" style={{ color: 'var(--bs-light)', fontWeight: '600' }}>
                    {benefit.title}
                  </h4>
                  <p className="text-light mb-0" style={{ 
                    lineHeight: '1.6',
                    fontSize: '0.95rem',
                    opacity: '0.9'
                  }}>
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyVenueOwners;