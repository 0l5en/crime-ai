import { useKeycloak } from "@/contexts/KeycloakContext";
import { useCrimeCases } from "@/hooks/useCrimeCases";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import GameCard from "./GameCard";

const GameShowcase = () => {
  const { t } = useTranslation('home');
  const { data: crimeCases, isLoading, error } = useCrimeCases({
    caseGeneratorFormType: 'BASIC',
    status: 'PUBLISHED,PREMIUM'
  });
  const { user } = useKeycloak();
  const navigate = useNavigate();

  const getImageColor = (index: number) => {
    const colors = [
      "bg-gradient-red",
      "bg-gradient-blue",
      "bg-gradient-green",
      "bg-gradient-purple",
      "bg-gradient-orange",
      "bg-gradient-teal",
    ];
    return colors[index % colors.length];
  };

  return (
    <section
      data-section="cases"
      className="py-5 px-4"
      style={{ minHeight: '100vh' }}
    >
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold mb-4">{t('showcase.title')}</h2>
          {isLoading && (
            <div className="text-muted">{t('showcase.loadingCases')}</div>
          )}
        </div>

        {error && (
          <div className="text-center py-5">
            <div className="text-danger h4 mb-3">
              {t('showcase.failedToLoad')}
            </div>
            <div className="text-muted">
              {error.message}
            </div>
          </div>
        )}

        {!error && !isLoading && (!crimeCases?.items || crimeCases.items.length === 0) && (
          <div className="text-center py-5">
            <div className="text-muted h5">
              {t('showcase.noCasesAvailable')}
            </div>
          </div>
        )}

        {!error && crimeCases?.items && crimeCases.items.length > 0 && (
          <>
            <div className="row g-4 mb-5 justify-content-center">
              {crimeCases.items.slice(0, 3).map((crimeCase, index) => (
                <div key={crimeCase.id} className="col-lg-4 col-md-6">
                  <GameCard
                    title={crimeCase.title}
                    description={crimeCase.summary}
                    imageUrl={crimeCase.imageUrl}
                    caseId={crimeCase.id}
                    userId={user?.email}
                  />
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                className="btn btn-primary btn-lg px-5 py-3 rounded-pill"
                onClick={() => navigate('/cases')}
              >
                {t('showcase.viewAllCases')}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default GameShowcase;
