const WhatAreVenueCases = () => {
  return (
    <section className="py-5 bg-dark text-light">
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <h2 className="display-4 fw-bold text-primary-custom mb-4">What Are Venue Cases?</h2>
            <p className="lead mb-4">
              Venue Cases are custom-crafted detective mysteries designed specifically for your location. 
              Each case is uniquely tailored to your property's layout, atmosphere, and character.
            </p>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card bg-dark border-secondary card-hover h-100">
              <div className="card-body text-center">
                <div className="display-1 text-danger mb-3">🏠</div>
                <h5 className="card-title text-primary-custom">Airbnb Mystery</h5>
                <p className="card-text text-light">
                  A murder mystery unfolds in your rental property. Guests become detectives, 
                  exploring every room for clues and solving the case during their stay.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card bg-dark border-secondary card-hover h-100">
              <div className="card-body text-center">
                <div className="display-1 text-danger mb-3">🏨</div>
                <h5 className="card-title text-primary-custom">Hotel Heist</h5>
                <p className="card-text text-light">
                  A valuable artifact goes missing from your hotel. Guests investigate the lobby, 
                  restaurant, and common areas to catch the thief.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card bg-dark border-secondary card-hover h-100">
              <div className="card-body text-center">
                <div className="display-1 text-danger mb-3">🍽️</div>
                <h5 className="card-title text-primary-custom">Restaurant Poisoning</h5>
                <p className="card-text text-light">
                  A suspicious incident at your restaurant. Diners turn into detectives, 
                  examining the kitchen, menu, and staff to solve the mystery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatAreVenueCases;