import { useKeycloak } from "@/contexts/KeycloakContext";
import { useCrimeCases } from "@/hooks/useCrimeCases";
import GameCard from "@/components/GameCard";
import Header from "@/components/Header";

const VacationRentalDashboard = () => {
  const { user } = useKeycloak();
  const { data: crimeCases, isLoading, error } = useCrimeCases({
    caseGeneratorFormType: 'VACATION_RENTAL',
    userId: user?.email || '',
  });

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="container-fluid py-5">
          <div className="text-center">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Lade deine Vacation Rental Cases...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="container-fluid py-5">
          <div className="text-center">
            <div className="alert alert-danger" role="alert">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              Fehler beim Laden der Cases: {error.message}
            </div>
          </div>
        </div>
      </>
    );
  }

  const cases = crimeCases?.items || [];

  return (
    <>
      <Header />
      <div className="container-fluid py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8">
            {/* Header Section */}
            <div className="text-center mb-5">
              <h1 className="display-4 fw-bold text-white mb-3">
                Meine Vacation Rental Cases
              </h1>
              <p className="lead text-muted">
                Hier findest du alle deine generierten Vacation Rental Kriminalfälle
              </p>
            </div>

            {/* Cases Grid */}
            {cases.length === 0 ? (
              <div className="text-center py-5">
                <div className="bg-dark rounded-3 p-5 border border-secondary">
                  <i className="bi bi-house-door display-1 text-muted mb-3"></i>
                  <h3 className="text-white mb-3">Noch keine Cases vorhanden</h3>
                  <p className="text-muted mb-4">
                    Du hast noch keine Vacation Rental Cases erstellt. 
                    Erstelle deinen ersten Case über den Admin-Bereich.
                  </p>
                  <a 
                    href="/admin/vacation-rental-case-generator" 
                    className="btn btn-danger btn-lg"
                  >
                    <i className="bi bi-plus-circle me-2"></i>
                    Ersten Case erstellen
                  </a>
                </div>
              </div>
            ) : (
              <div className="row g-4">
                {cases.map((crimeCase) => (
                  <div key={crimeCase.id} className="col-12 col-md-6 col-lg-4">
                    <GameCard 
                      caseId={crimeCase.id}
                      title={crimeCase.title}
                      description={crimeCase.description}
                      imageUrl={crimeCase.imageUrl}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Stats Section */}
            {cases.length > 0 && (
              <div className="mt-5 pt-4 border-top border-secondary">
                <div className="row text-center">
                  <div className="col-md-6">
                    <div className="bg-dark rounded p-3">
                      <div className="display-6 text-danger fw-bold">{cases.length}</div>
                      <div className="text-muted small">Vacation Rental Cases</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="bg-dark rounded p-3">
                      <div className="display-6 text-warning fw-bold">
                        {cases.filter(c => c.title.length > 0).length}
                      </div>
                      <div className="text-muted small">Aktive Cases</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VacationRentalDashboard;