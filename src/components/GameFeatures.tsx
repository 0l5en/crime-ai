import { DollarSign, FileText, Fingerprint, MapPin, Shield, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

const GameFeatures = () => {
  const { t } = useTranslation('home');
  
  const features = [
    {
      icon: Fingerprint,
      titleKey: "features.forensicAnalysis.title",
      descriptionKey: "features.forensicAnalysis.description"
    },
    {
      icon: Users,
      titleKey: "features.witnessesAndSuspects.title",
      descriptionKey: "features.witnessesAndSuspects.description"
    },
    {
      icon: FileText,
      titleKey: "features.caseFiles.title",
      descriptionKey: "features.caseFiles.description"
    },
    {
      icon: MapPin,
      titleKey: "features.interactiveMaps.title",
      descriptionKey: "features.interactiveMaps.description"
    },
    {
      icon: Shield,
      titleKey: "features.premiumContent.title",
      descriptionKey: "features.premiumContent.description"
    },
    {
      icon: DollarSign,
      titleKey: "features.referralProgram.title",
      descriptionKey: "features.referralProgram.description"
    }
  ];

  return (
    <section className="py-5 d-flex align-items-center" style={{ minHeight: '100vh' }}>
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <h2 className="display-4 fw-bold text-primary-custom mb-4">{t('features.title')}</h2>
            <p className="lead">
              {t('features.subtitle')}
            </p>
          </div>
        </div>

        <div className="row g-4">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="col-lg-4 col-md-6">
                <div className="card bg-body border-0 h-100 card-hover">
                  <div className="card-body text-center p-4">
                    <div className="mb-3">
                      <IconComponent size={48} className="text-primary-custom" />
                    </div>
                    <h4 className="text-primary-custom mb-3">{t(feature.titleKey)}</h4>
                    <p className="mb-0">{t(feature.descriptionKey)}</p>
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