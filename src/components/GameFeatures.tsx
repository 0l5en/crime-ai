import { Fingerprint, Users, FileText, MapPin, Shield, DollarSign } from "lucide-react";

const GameFeatures = () => {
  const features = [
    {
      icon: Fingerprint,
      title: "Forensic Analysis",
      description: "Analyze fingerprints, DNA traces, and other evidence using cutting-edge forensic methods in this interactive detective game experience."
    },
    {
      icon: Users,
      title: "Witnesses & Suspects",
      description: "Interview witnesses and interrogate suspects with our advanced AI system that creates realistic conversations in this interactive detective game."
    },
    {
      icon: FileText,
      title: "Case Files",
      description: "Access detailed digital case files containing all the vital information, evidence, and investigation reports needed to solve cases in this interactive detective game."
    },
    {
      icon: MapPin,
      title: "Interactive Maps",
      description: "Explore crime scenes and track suspect movements with detailed interactive maps that reveal crucial spatial relationships in this immersive detective experience."
    },
    {
      icon: Shield,
      title: "Premium Content",
      description: "Unlock exclusive premium cases with more complex scenarios, additional content, and challenging mysteries in our interactive detective game collection."
    },
    {
      icon: DollarSign,
      title: "Referral Program",
      description: "Earn real money by referring friends to DetectiveGame. Get one month of premium membership for each new premium member you refer."
    }
  ];

  return (
    <section className="py-5 bg-dark text-light d-flex align-items-center" style={{ minHeight: '100vh' }}>
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <h2 className="display-4 fw-bold text-primary-custom mb-4">DetectivesGame Features</h2>
            <p className="lead text-light">
              Use cutting-edge investigation methods and tools to solve the most complicated cases
            </p>
          </div>
        </div>

        <div className="row g-4">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="col-lg-4 col-md-6">
                <div className="card bg-secondary border-0 h-100 card-hover">
                  <div className="card-body text-center p-4">
                    <div className="mb-3">
                      <IconComponent size={48} className="text-primary-custom" />
                    </div>
                    <h4 className="text-primary-custom mb-3">{feature.title}</h4>
                    <p className="text-light mb-0">{feature.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GameFeatures;