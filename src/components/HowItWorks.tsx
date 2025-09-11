const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Start Free Trial",
      description: "Create your account and begin your 7-day free trial. Enter your payment details to get started."
    },
    {
      number: "02", 
      title: "Register Your Venue",
      description: "Share details about your property, including layout, unique features, and target guest experience."
    },
    {
      number: "03",
      title: "Get Exclusive Case",
      description: "Receive your custom mystery case within 24 hours, tailored specifically to your venue's character and layout."
    }
  ];

  return (
    <section className="py-5 bg-secondary text-light d-flex align-items-center" style={{ minHeight: '100vh' }}>
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <h2 className="display-4 fw-bold text-primary-custom mb-4">How It Works</h2>
            <p className="lead">
              Getting your custom venue case is simple. We handle all the creative work while you focus on hosting amazing experiences.
            </p>
          </div>
        </div>

        <div className="row g-5">
          {steps.map((step, index) => (
            <div key={index} className="col-md-4">
              <div className="text-center">
                <div 
                  className="display-3 fw-bold text-danger mb-3 rounded-circle d-inline-flex align-items-center justify-content-center"
                  style={{ width: '80px', height: '80px', border: '3px solid var(--bs-danger)' }}
                >
                  {step.number}
                </div>
                <h4 className="text-primary-custom mb-3">{step.title}</h4>
                <p className="text-light">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;