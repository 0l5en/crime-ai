
import { Button } from "@/components/ui/button";
import GameCard from "./GameCard";
import { useCrimeCases } from "@/hooks/useCrimeCases";
import { useKeycloak } from "@/contexts/KeycloakContext";

const GameShowcase = () => {
  const { data: crimeCases, isLoading, error } = useCrimeCases();
  const { user } = useKeycloak();

  const getImageColor = (index: number) => {
    const colors = [
      "bg-gradient-danger",
      "bg-gradient-primary", 
      "bg-gradient-success",
      "bg-gradient-warning",
      "bg-gradient-info",
      "bg-gradient-secondary",
    ];
    return colors[index % colors.length];
  };

  return (
    <section 
      data-section="cases" 
      className="bg-dark text-light py-5 px-4"
    >
      <div className="container">
        <div className="d-flex align-items-center justify-content-between mb-5">
          <h2 className="display-4 fw-bold">Latest Crime Cases</h2>
          {isLoading && (
            <div className="text-muted">Loading cases...</div>
          )}
        </div>
        
        {error && (
          <div className="text-center py-5">
            <div className="text-danger h4 mb-3">
              Failed to load crime cases
            </div>
            <div className="text-muted">
              {error.message}
            </div>
          </div>
        )}

        {!error && !isLoading && (!crimeCases?.items || crimeCases.items.length === 0) && (
          <div className="text-center py-5">
            <div className="text-muted h5">
              No crime cases available
            </div>
          </div>
        )}

        {!error && crimeCases?.items && crimeCases.items.length > 0 && (
          <>
            <div className="row g-4 mb-5">
              {crimeCases.items.map((crimeCase, index) => (
                <div key={crimeCase.id} className="col-md-4">
                  <GameCard
                    title={crimeCase.title}
                    description={crimeCase.description}
                    imageColor={getImageColor(index)}
                    caseId={crimeCase.id}
                    userId={user?.email}
                  />
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Button 
                variant="outline-secondary" 
                className="bg-transparent border-light text-light btn-lg px-5 py-3"
              >
                View All Cases
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default GameShowcase;
