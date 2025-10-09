
import EvidenceSelectionCard from "@/components/EvidenceSelectionCard";
import Header from "@/components/Header";
import MotiveSelectionCard from "@/components/MotiveSelectionCard";
import SuspectSelectionCard from "@/components/SuspectSelectionCard";
import { useKeycloak } from "@/contexts/KeycloakContext";
import { useCaseEvidences } from "@/hooks/useCaseEvidences";
import { useCaseMotives } from "@/hooks/useCaseMotives";
import { useCaseSuspects } from "@/hooks/useCaseSuspects";
import { useCreateSolutionAttempt } from "@/hooks/useCreateSolutionAttempt";
import { useCrimeCase } from "@/hooks/useCrimeCase";
import { useSolutionAttempts } from "@/hooks/useSolutionAttempts";
import { useCaseRating } from "@/hooks/useCaseRating";
import StarRating from "@/components/StarRating";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CaseSolution = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();
  const { user } = useKeycloak();
  const { t } = useTranslation('caseDashboard');

  const [selectedSuspects, setSelectedSuspects] = useState<number[]>([]);
  const [selectedEvidences, setSelectedEvidences] = useState<number[]>([]);
  const [selectedMotives, setSelectedMotives] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const { data: crimeCase } = useCrimeCase(caseId || '');
  const { data: evidences } = useCaseEvidences(caseId || '');
  const { data: suspects } = useCaseSuspects(caseId || '');
  const { data: motives } = useCaseMotives(caseId || '');

  const createSolutionMutation = useCreateSolutionAttempt(caseId || '');
  const { setRating } = useCaseRating(caseId || '', user?.email);

  // Query for checking successful attempts (will be triggered after solution submission)
  const { data: successfulAttempts, refetch: checkSolutionSuccess } = useSolutionAttempts(
    caseId || '',
    user?.email,
    "1" // success = true
  );

  const toggleSuspect = (suspectId: number) => {
    setSelectedSuspects(prev => {
      if (prev.includes(suspectId)) {
        return prev.filter(id => id !== suspectId);
      } else {
        return [...prev, suspectId];
      }
    });
  };

  const toggleEvidence = (evidenceId: number) => {
    setSelectedEvidences(prev => {
      if (prev.includes(evidenceId)) {
        return prev.filter(id => id !== evidenceId);
      } else {
        return [...prev, evidenceId];
      }
    });
  };

  const toggleMotive = (motiveId: number) => {
    setSelectedMotives(prev => {
      if (prev.includes(motiveId)) {
        return prev.filter(id => id !== motiveId);
      } else {
        return [...prev, motiveId];
      }
    });
  };

  const resetSelections = () => {
    setSelectedSuspects([]);
    setSelectedEvidences([]);
    setSelectedMotives([]);
    setShowResult(false);
    setIsSolved(false);
    setUserRating(0);
  };

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

  const handleSolutionSubmit = async () => {
    if (selectedSuspects.length === 0 || selectedEvidences.length === 0 || selectedMotives.length === 0 || !user?.email) {
      return;
    }

    try {
      setIsValidating(true);

      // Submit the solution attempt
      await createSolutionMutation.mutateAsync({
        solution: {
          evidenceIds: selectedEvidences,
          motiveIds: selectedMotives,
          personIds: selectedSuspects,
        },
        userId: user.email,
      });

      // Check if the solution was successful by refetching successful attempts
      const { data: updatedSuccessfulAttempts } = await checkSolutionSuccess();

      // Check if we have any successful attempts
      const hasSuccessfulAttempt = updatedSuccessfulAttempts?.items && updatedSuccessfulAttempts.items.length > 0;

      setIsSolved(!!hasSuccessfulAttempt);
      setShowResult(true);

    } catch (error) {
      console.error("Failed to submit solution:", error);
      setIsSolved(false);
      setShowResult(true);
    } finally {
      setIsValidating(false);
    }
  };

  if (showResult) {
    return (
      <div className="min-vh-100">
        <Header />

        <div className="container py-5">
          <div className="d-flex align-items-center mb-5">
            <button
              className="btn btn-secondary btn-sm me-3"
              onClick={resetSelections}
            >
              <ArrowLeft className="me-2" style={{ width: '16px', height: '16px' }} />
              {t('solutionPage.tryAgain')}
            </button>

            <h1 className="h2 mb-0">{t('solutionPage.resultTitle')}</h1>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className={`card text-center border-3 ${isSolved ? 'border-success bg-success bg-opacity-10' : 'border-danger bg-danger bg-opacity-10'}`}>
                <div className="card-body p-5">
                  <div className="mb-4">
                    {isSolved ? (
                      <CheckCircle className="text-success mx-auto mb-3" style={{ width: '4rem', height: '4rem' }} />
                    ) : (
                      <XCircle className="text-danger mx-auto mb-3" style={{ width: '4rem', height: '4rem' }} />
                    )}

                    <h2 className={`h3 mb-3 ${isSolved ? 'text-success' : 'text-danger'}`}>
                      {isSolved ? t('solutionPage.successTitle') : t('solutionPage.failureTitle')}
                    </h2>

                    <p className="lead">
                      {isSolved
                        ? t('solutionPage.successMessage')
                        : t('solutionPage.failureMessage')
                      }
                    </p>
                  </div>

                  {/* Solution Summary - nur bei erfolgreicher Lösung */}
                  {isSolved && crimeCase?.summary && (
                    <div className="mb-4 p-4 bg-light border rounded">
                      <h3 className="h5 mb-3 text-success">{t('solutionPage.solutionSummary')}</h3>
                      <p className="text-start" style={{ whiteSpace: 'pre-line' }}>
                        {crimeCase.summary}
                      </p>
                    </div>
                  )}

                  {/* Rating Section - nur bei erfolgreicher Lösung */}
                  {isSolved && (
                    <div className="mb-4">
                      <h3 className="h5 mb-3">{t('solutionPage.rateCase')}</h3>
                      <div className="d-flex justify-content-center">
                        <StarRating
                          rating={userRating}
                          onRatingChange={(rating) => {
                            setUserRating(rating);
                            setRating(rating);
                          }}
                          size={32}
                        />
                      </div>
                      {userRating > 0 && (
                        <p className="text-muted mt-2 small">
                          {t('solutionPage.thankYou')}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="d-flex justify-content-center gap-3">
                    <button
                      onClick={resetSelections}
                      className="btn btn-secondary"
                    >
                      {t('solutionPage.tryAgain')}
                    </button>
                    <button
                      onClick={() => navigate(`/case/${caseId}`)}
                      className="btn btn-primary"
                    >
                      {t('solutionPage.backToCase')}
                    </button>
                    <button
                      onClick={() => navigate('/')}
                      className="btn btn-danger"
                    >
                      {t('solutionPage.backToCases')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100">
      <Header />

      <div className="container py-4">
        <div className="d-flex align-items-center mb-5">
          <button
            className="btn btn-secondary btn-sm me-3"
            onClick={() => navigate(`/case/${caseId}`)}
          >
            <ArrowLeft className="me-2" style={{ width: '16px', height: '16px' }} />
            {t('solutionPage.backToCase')}
          </button>

          <div>
            <h1 className="h2 mb-1">
              {t('solutionPage.solveTheCase')}: {crimeCase?.title}
            </h1>
            <p className="text-muted mb-0">
              {t('solutionPage.selectInstruction')}
            </p>
          </div>
        </div>

        {/* Suspect Selection */}
        <div className="card border-secondary mb-5">
          <div className="card-header">
            <h3 className="card-title">
              {t('solutionPage.selectSuspects')}
              {selectedSuspects.length > 0 && (
                <span className="badge bg-success ms-2">{selectedSuspects.length} {t('solutionPage.selected')}</span>
              )}
            </h3>
          </div>
          <div className="card-body">
            {suspects?.items && suspects.items.length > 0 ? (
              <div className="row g-3">
                {suspects.items.map((suspect, index) => (
                  <div key={suspect.id} className="col-md-4 col-lg-3">
                    <SuspectSelectionCard
                      name={suspect.name}
                      isSelected={selectedSuspects.includes(suspect.id)}
                      onToggle={() => toggleSuspect(suspect.id)}
                      imageColor={getImageColor(index)}
                      imageUrl={suspect.imageUrl}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted text-center py-4">{t('solutionPage.noSuspects')}</p>
            )}
          </div>
        </div>

        {/* Evidence Selection */}
        <div className="card border-secondary mb-5">
          <div className="card-header">
            <h3 className="card-title">
              {t('solutionPage.selectEvidence')}
              {selectedEvidences.length > 0 && (
                <span className="badge bg-primary ms-2">
                  {selectedEvidences.length} {t('solutionPage.selected')}
                </span>
              )}
            </h3>
          </div>
          <div className="card-body">
            {evidences?.items && evidences.items.length > 0 ? (
              <div className="row g-3">
                {evidences.items.map((evidence, index) => (
                  <div key={evidence.id} className="col-md-4 col-lg-3">
                    <EvidenceSelectionCard
                      title={evidence.title}
                      isSelected={selectedEvidences.includes(evidence.id)}
                      onToggle={() => toggleEvidence(evidence.id)}
                      imageColor={getImageColor(index)}
                      imageUrl={evidence.imageUrl}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted text-center py-4">{t('solutionPage.noEvidence')}</p>
            )}
          </div>
        </div>

        {/* Motive Selection */}
        <div className="card border-secondary mb-5">
          <div className="card-header">
            <h3 className="card-title">
              {t('solutionPage.selectMotives')}
              {selectedMotives.length > 0 && (
                <span className="badge bg-warning ms-2">{selectedMotives.length} {t('solutionPage.selected')}</span>
              )}
            </h3>
          </div>
          <div className="card-body">
            {motives?.items && motives.items.length > 0 ? (
              <div className="row g-3">
                {motives.items.map((motive, index) => (
                  <div key={motive.id} className="col-md-4 col-lg-3">
                    <MotiveSelectionCard
                      title={motive.title}
                      isSelected={selectedMotives.includes(motive.id)}
                      onToggle={() => toggleMotive(motive.id)}
                      imageColor={getImageColor(index)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted text-center py-4">{t('solutionPage.noMotives')}</p>
            )}
          </div>
        </div>

        {/* Submit Solution */}
        <div className="text-center">
          <button
            onClick={handleSolutionSubmit}
            className="btn btn-danger btn-lg px-5 py-3"
            disabled={selectedSuspects.length === 0 || selectedEvidences.length === 0 || selectedMotives.length === 0 || createSolutionMutation.isPending || isValidating}
          >
            {isValidating ? t('solutionPage.validating') : createSolutionMutation.isPending ? t('solutionPage.submitting') : t('solutionPage.submitSolution')}
          </button>

          {(selectedSuspects.length === 0 || selectedEvidences.length === 0 || selectedMotives.length === 0) && (
            <p className="text-muted mt-3 small">
              {t('solutionPage.pleaseSelect')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseSolution;
