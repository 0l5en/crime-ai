import AddCaseCard from "@/components/AddCaseCard";
import GameCard from "@/components/GameCard";
import GeneratingCaseCard from "@/components/GeneratingCaseCard";
import Header from "@/components/Header";
import QRCodeCard from "@/components/QRCodeCard";
import VacationRentalCaseGeneratorForm from "@/components/VacationRentalCaseGeneratorForm";
import VacationRentalDashboardTabs from "@/components/VacationRentalDashboardTabs";
import { useUserContext } from '@/contexts/UserContext';
import { useCrimeCases } from "@/hooks/useCrimeCases";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

interface GeneratingCase {
  tempId: string;
  venueName: string;
  startTime: number;
}

const VacationRentalDashboard = () => {
  const { t } = useTranslation('vacationRentalDashboard');
  const user = useUserContext();
  const { data: crimeCases, isLoading, error, refetch } = useCrimeCases({
    caseGeneratorFormType: 'VACATION_RENTAL',
    userId: user?.email || '',
  });
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [generatingCases, setGeneratingCases] = useState<GeneratingCase[]>([]);
  const [activeTab, setActiveTab] = useState('cases');

  // Polling effect to refresh cases and remove completed generating cases
  useEffect(() => {
    if (generatingCases.length > 0) {
      const interval = setInterval(() => {
        refetch();

        // Remove generating cases older than 5 minutes (in case something went wrong)
        const now = Date.now();
        setGeneratingCases(prev => prev.filter(gc => now - gc.startTime < 5 * 60 * 1000));
      }, 5000); // Poll every 5 seconds

      return () => clearInterval(interval);
    }
  }, [generatingCases.length, refetch]);

  // Form handlers
  const handleCreateNewCase = () => {
    setShowCreateForm(true);
  };

  const handleGenerationStart = (tempCase: { tempId: string; venueName: string }) => {
    setGeneratingCases(prev => [...prev, { ...tempCase, startTime: Date.now() }]);
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
              {t('errorLoading')} {error.message}
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
      case 'subscription':
        return renderSubscriptionContent();
      default:
        return renderCasesContent();
    }
  };

  const renderCasesContent = () => (
    <>
      {/* Cases Grid */}
      {cases.length === 0 && generatingCases.length === 0 ? (
        <div className="text-center py-5">
          <div className="rounded-3 p-5 border border-secondary">
            <i className="bi bi-house-door display-1 text-muted mb-3"></i>
            <h3 className="mb-3">{t('cases.noCasesTitle')}</h3>
            <p className="text-muted mb-4">
              {t('cases.noCasesMessage')}
            </p>
            <button
              onClick={handleCreateNewCase}
              className="btn btn-danger btn-lg"
            >
              <i className="bi bi-plus-circle me-2"></i>
              {t('cases.createFirstCase')}
            </button>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {/* Generating Cases */}
          {generatingCases.map((generatingCase) => (
            <div key={generatingCase.tempId} className="col-12 col-md-6 col-lg-4">
              <GeneratingCaseCard
                venueName={generatingCase.venueName}
                tempId={generatingCase.tempId}
              />
            </div>
          ))}

          {/* Actual Cases */}
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

          {/* Add New Case Card */}
          <div className="col-12 col-md-6 col-lg-4">
            <AddCaseCard onClick={handleCreateNewCase} />
          </div>
        </div>
      )}

      {/* Stats Section */}
      {(cases.length > 0 || generatingCases.length > 0) && (
        <div className="mt-5 pt-4 border-top border-secondary">
          <div className="row text-center">
            <div className="col-md-4">
              <div className="bg-body rounded p-3">
                <div className="display-6 text-danger fw-bold">{cases.length}</div>
                <div className="text-muted small">{t('cases.readyCases')}</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="bg-body rounded p-3">
                <div className="display-6 text-primary fw-bold">{generatingCases.length}</div>
                <div className="text-muted small">{t('cases.generatingCases')}</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="bg-body rounded p-3">
                <div className="display-6 text-primary fw-bold">
                  {cases.length + generatingCases.length}
                </div>
                <div className="text-muted small">{t('cases.totalCases')}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );

  const renderPromotionContent = () => (
    <>
      {cases.length === 0 ? (
        <div className="text-center py-5">
          <div className="rounded-3 p-5 border border-secondary">
            <i className="bi bi-qr-code display-1 text-muted mb-3"></i>
            <h3 className="mb-3">{t('promotion.noQRCodesTitle')}</h3>
            <p className="text-muted mb-4">
              {t('promotion.noQRCodesMessage')}
            </p>
            <button
              onClick={() => setActiveTab('cases')}
              className="btn btn-danger"
            >
              <i className="bi bi-plus-circle me-2"></i>
              {t('promotion.goToCases')}
            </button>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {cases.map((crimeCase) => (
            <div key={crimeCase.id} className="col-12 col-md-6 col-lg-4">
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

  const renderSubscriptionContent = () => (
    <div className="text-center py-5">
      <div className="rounded-3 p-5 border border-secondary">
        <i className="bi bi-credit-card display-1 text-muted mb-3"></i>
        <h3 className="mb-3">{t('subscription.title')}</h3>
        <p className="text-muted mb-4">
          {t('subscription.message')}
        </p>
      </div>
    </div>
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
                  {t('header.title')}
                </h1>
                <p className="lead text-muted">
                  {t('header.subtitle')}
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
                <h1 className="display-4 fw-bold mb-3">
                  {t('createForm.title')}
                </h1>
                <button
                  onClick={handleFormCancel}
                  className="btn btn-outline-secondary mb-4"
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  {t('createForm.backToOverview')}
                </button>
              </div>

              {/* Form Component */}
              <VacationRentalCaseGeneratorForm
                onSuccess={handleFormSuccess}
                onCancel={handleFormCancel}
                onGenerationStart={handleGenerationStart}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VacationRentalDashboard;