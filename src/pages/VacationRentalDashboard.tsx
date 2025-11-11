import AddCaseCard from "@/components/AddCaseCard";
import Footer from "@/components/Footer";
import GameCard from "@/components/GameCard";
import GeneratingCaseCard from "@/components/GeneratingCaseCard";
import Header from "@/components/Header";
import QRCodeCard from "@/components/QRCodeCard";
import VacationRentalCaseGeneratorForm from "@/components/VacationRentalCaseGeneratorForm";
import VacationRentalDashboardTabs from "@/components/VacationRentalDashboardTabs";
import { useCrimeCases } from "@/hooks/useCrimeCasesVacationRental";
import { useMyCaseGenerationAttempts } from "@/hooks/useMyCaseGenerationAttempts";
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

const VacationRentalDashboard = () => {
  const { t } = useTranslation('vacationRentalDashboard');

  // Crime Cases Hook (veröffentlichte Fälle)
  const { data: crimeCases, isLoading: casesLoading, error: casesError } = useCrimeCases();

  // Generation Attempts Hook (in Bearbeitung)
  const { data: generationAttempts, isLoading: attemptsLoading } = useMyCaseGenerationAttempts();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [activeTab, setActiveTab] = useState('cases');

  const isLoading = casesLoading || attemptsLoading;
  const error = casesError;

  // Scroll to top when form is shown
  useEffect(() => {
    if (showCreateForm) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [showCreateForm]);

  // Form handlers
  const handleCreateNewCase = () => {
    setShowCreateForm(true);
  };

  const handleFormSuccess = () => {
    setShowCreateForm(false);
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
              <span className="visually-hidden">{t('loading')}</span>
            </div>
            <p className="mt-3 text-muted">{t('loadingCases')}</p>
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
              {t('errorLoading')}: {error.message}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const cases = crimeCases?.items || [];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'cases':
        return renderCasesContent();
      case 'promotion':
        return renderPromotionContent();
      default:
        return renderCasesContent();
    }
  };

  const renderCasesContent = () => {
    const cases = crimeCases?.items || [];
    const attempts = generationAttempts?.items || [];

    return (
      <>
        {cases.length === 0 && attempts.length === 0 ? (
          <div className="text-center py-5">
            <div className="rounded-3 p-5 border border-secondary">
              <i className="bi bi-house-door display-1 text-muted mb-3"></i>
              <h3 className="mb-3">{t('casesTab.noCasesTitle')}</h3>
              <p className="text-muted mb-4">
                {t('casesTab.noCasesDescription')}
              </p>
              <button
                onClick={handleCreateNewCase}
                className="btn btn-danger btn-lg"
              >
                <i className="bi bi-plus-circle me-2"></i>
                {t('casesTab.createFirstCase')}
              </button>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {/* all attempts */}
            {attempts.map((attempt) => (
              <div key={attempt.id} className="col-12 col-lg-6">
                <GeneratingCaseCard
                  attemptId={attempt.id}
                  created={attempt.created}
                />
              </div>
            ))}

            {/* Published Cases */}
            {cases.map((crimeCase) => (
              <div key={crimeCase.id} className="col-12 col-lg-6">
                <GameCard
                  caseId={crimeCase.id}
                  title={crimeCase.title}
                  description={crimeCase.description}
                  imageUrl={crimeCase.imageUrl}
                  hideDescription={true}
                  showSubscriptionInfo={true}
                  subscriptionId={crimeCase.id}
                />
              </div>
            ))}

            {/* Add New Case Card */}
            <div className="col-12 col-lg-6">
              <AddCaseCard onClick={handleCreateNewCase} />
            </div>
          </div>
        )}

        {/* Stats Section */}
        {(cases.length > 0 || attempts.length > 0) && (
          <div className="mt-5 pt-4 border-top border-secondary">
            <div className="row text-center">
              <div className="col-md-4">
                <div className="bg-body rounded p-3">
                  <div className="display-6 text-danger fw-bold">{cases.length}</div>
                  <div className="text-muted small">{t('casesTab.stats.readyCases')}</div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="bg-body rounded p-3">
                  <div className="display-6 text-primary fw-bold">{attempts.length}</div>
                  <div className="text-muted small">{t('casesTab.stats.generatingCases')}</div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="bg-body rounded p-3">
                  <div className="display-6 text-primary fw-bold">
                    {cases.length + attempts.length}
                  </div>
                  <div className="text-muted small">{t('casesTab.stats.totalCases')}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  const renderPromotionContent = () => (
    <>
      {cases.length === 0 ? (
        <div className="text-center py-5">
          <div className="rounded-3 p-5 border border-secondary">
            <i className="bi bi-qr-code display-1 text-muted mb-3"></i>
            <h3 className="mb-3">{t('promotionTab.noQRCodesTitle')}</h3>
            <p className="text-muted mb-4">
              {t('promotionTab.noQRCodesDescription')}
            </p>
            <button
              onClick={() => setActiveTab('cases')}
              className="btn btn-danger"
            >
              <i className="bi bi-plus-circle me-2"></i>
              {t('promotionTab.goToCases')}
            </button>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {cases.map((crimeCase) => (
            <div key={crimeCase.id} className="col-12 col-lg-6">
              <QRCodeCard
                caseId={crimeCase.id}
                title={crimeCase.title}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );


  return (
    <div className="min-vh-100" style={{ backgroundColor: 'var(--bs-body-bg)' }}>
      <Header />
      {!showCreateForm ? (
        <div className="container-fluid py-5">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8">
              {/* Header Section */}
              <div className="text-center mb-5">
                <h1 className="display-4 fw-bold mb-3">
                  {t('title')}
                </h1>
                <p className="lead text-muted">
                  {t('subtitle')}
                </p>
              </div>

              {/* Tabs Navigation */}
              <VacationRentalDashboardTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />

              {/* Tab Content */}
              {renderTabContent()}

            </div>
          </div>
        </div>
      ) : (
        <div className="container-fluid py-5">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 col-xl-8">
              {/* Header Section for Form */}
              <div className="text-center mb-5">
                <h1 className="h2 fw-bold mb-3">
                  {t('form.title')}
                </h1>
                <p className="text-muted mb-4" style={{ maxWidth: '800px', margin: '0 auto', fontSize: '0.95rem' }}>
                  {t('form.description')}
                </p>
                <button
                  onClick={handleFormCancel}
                  className="btn btn-outline-secondary mb-4"
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  {t('form.backToOverview')}
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
      <Footer />
    </div>
  );
};

export default VacationRentalDashboard;