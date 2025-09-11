import { useKeycloak } from "@/contexts/KeycloakContext";
import { useCrimeCases } from "@/hooks/useCrimeCases";
import GameCard from "@/components/GameCard";
import AddCaseCard from "@/components/AddCaseCard";
import Header from "@/components/Header";
import VacationRentalCaseGeneratorForm from "@/components/VacationRentalCaseGeneratorForm";
import { useState } from "react";

const VacationRentalDashboard = () => {
  const { user } = useKeycloak();
  const { data: crimeCases, isLoading, error, refetch } = useCrimeCases({
    caseGeneratorFormType: 'VACATION_RENTAL',
    userId: user?.email || '',
  });
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Form handlers
  const handleCreateNewCase = () => {
    setShowCreateForm(true);
  };

  const handleFormSuccess = (locationUrl: string) => {
    setShowCreateForm(false);
    refetch(); // Reload cases after successful creation
  };

  const handleFormCancel = () => {
    setShowCreateForm(false);
  };

  if (isLoading) {
    return (
      <div className="min-vh-100" style={{ backgroundColor: 'var(--bs-body-bg)' }}>
        <Header />
        <div className="container-fluid py-5">
          <div className="text-center">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading your Vacation Rental Cases...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-vh-100" style={{ backgroundColor: 'var(--bs-body-bg)' }}>
        <Header />
        <div className="container-fluid py-5">
          <div className="text-center">
            <div className="alert alert-danger" role="alert">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              Error loading cases: {error.message}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const cases = crimeCases?.items || [];

  return (
    <div className="min-vh-100" style={{ backgroundColor: 'var(--bs-body-bg)' }}>
      <Header />
      {!showCreateForm ? (
        <div className="container-fluid py-5">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8">
              {/* Header Section */}
              <div className="text-center mb-5">
                <h1 className="display-4 fw-bold text-white mb-3">
                  My Vacation Rental Cases
                </h1>
                <p className="lead text-muted">
                  Here you can find all your generated vacation rental crime cases
                </p>
              </div>

              {/* Cases Grid */}
              {cases.length === 0 ? (
                <div className="text-center py-5">
                  <div className="bg-dark rounded-3 p-5 border border-secondary">
                    <i className="bi bi-house-door display-1 text-muted mb-3"></i>
                    <h3 className="text-white mb-3">No Cases Available Yet</h3>
                    <p className="text-muted mb-4">
                      You haven't created any Vacation Rental Cases yet. 
                      Create your first case through the admin area.
                    </p>
                    <button 
                      onClick={handleCreateNewCase}
                      className="btn btn-danger btn-lg"
                    >
                      <i className="bi bi-plus-circle me-2"></i>
                      Create First Case
                    </button>
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
                        hideDescription={true}
                      />
                    </div>
                  ))}
                  <div className="col-12 col-md-6 col-lg-4">
                    <AddCaseCard onClick={handleCreateNewCase} />
                  </div>
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
                        <div className="text-muted small">Active Cases</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="container-fluid py-5">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8">
              {/* Header Section for Form */}
              <div className="text-center mb-5">
                <h1 className="display-4 fw-bold text-white mb-3">
                  Create New Vacation Rental Case
                </h1>
                <button 
                  onClick={handleFormCancel}
                  className="btn btn-outline-secondary mb-4"
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Back to Overview
                </button>
              </div>

              {/* Form Component */}
              <VacationRentalCaseGeneratorForm
                onSuccess={handleFormSuccess}
                onCancel={handleFormCancel}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VacationRentalDashboard;