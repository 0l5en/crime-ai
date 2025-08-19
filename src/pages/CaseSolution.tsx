
import Header from "@/components/Header";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useCrimeCase } from "@/hooks/useCrimeCase";
import { useCaseEvidences } from "@/hooks/useCaseEvidences";
import { useCaseSuspects } from "@/hooks/useCaseSuspects";
import { useCaseMotives } from "@/hooks/useCaseMotives";
import { useCreateSolutionAttempt } from "@/hooks/useCreateSolutionAttempt";
import { useKeycloak } from "@/contexts/KeycloakContext";
import SuspectSelectionCard from "@/components/SuspectSelectionCard";
import EvidenceSelectionCard from "@/components/EvidenceSelectionCard";
import MotiveSelectionCard from "@/components/MotiveSelectionCard";

const CaseSolution = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();
  const { user } = useKeycloak();
  
  const [selectedSuspect, setSelectedSuspect] = useState<number | null>(null);
  const [selectedEvidences, setSelectedEvidences] = useState<number[]>([]);
  const [selectedMotive, setSelectedMotive] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [solutionResult, setSolutionResult] = useState<any>(null);

  const { data: crimeCase } = useCrimeCase(caseId || '');
  const { data: evidences } = useCaseEvidences(caseId || '');
  const { data: suspects } = useCaseSuspects(caseId || '');
  const { data: motives } = useCaseMotives(caseId || '');
  
  const createSolutionMutation = useCreateSolutionAttempt(caseId || '');

  const toggleSuspect = (suspectId: number) => {
    setSelectedSuspect(prevSuspect => (prevSuspect === suspectId ? null : suspectId));
  };

  const toggleEvidence = (evidenceId: number) => {
    setSelectedEvidences(prevEvidences => {
      if (prevEvidences.includes(evidenceId)) {
        return prevEvidences.filter(id => id !== evidenceId);
      } else {
        return [...prevEvidences, evidenceId];
      }
    });
  };

  const toggleMotive = (motiveId: number) => {
    setSelectedMotive(prevMotive => (prevMotive === motiveId ? null : motiveId));
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
    if (!selectedSuspect || selectedEvidences.length === 0 || !selectedMotive || !user?.email) {
      return;
    }

    try {
      const result = await createSolutionMutation.mutateAsync({
        solution: {
          evidenceIds: selectedEvidences,
          motiveIds: [selectedMotive],
          personIds: [selectedSuspect],
        },
        userId: user.email,
      });

      setSolutionResult(result);
      setShowResult(true);
    } catch (error) {
      console.error("Failed to submit solution:", error);
    }
  };

  if (showResult && solutionResult) {
    return (
      <div className="min-vh-100 bg-dark">
        <Header />
        
        <div className="container py-5">
          <div className="d-flex align-items-center mb-5">
            <button
              className="btn btn-secondary btn-sm me-3"
              onClick={() => {
                setShowResult(false);
                setSolutionResult(null);
              }}
            >
              <ArrowLeft className="me-2" style={{ width: '16px', height: '16px' }} />
              Try Again
            </button>
            
            <h1 className="h2 text-white mb-0">Case Solution Result</h1>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className={`card text-center border-3 ${solutionResult.isCorrect ? 'border-success bg-success bg-opacity-10' : 'border-danger bg-danger bg-opacity-10'}`}>
                <div className="card-body p-5">
                  <div className="mb-4">
                    {solutionResult.isCorrect ? (
                      <CheckCircle className="text-success mx-auto mb-3" style={{ width: '4rem', height: '4rem' }} />
                    ) : (
                      <XCircle className="text-danger mx-auto mb-3" style={{ width: '4rem', height: '4rem' }} />
                    )}
                    
                    <h2 className={`h3 mb-3 ${solutionResult.isCorrect ? 'text-success' : 'text-danger'}`}>
                      {solutionResult.isCorrect ? 'Case Solved!' : 'Incorrect Solution'}
                    </h2>
                    
                    <p className="text-white lead">
                      {solutionResult.feedback}
                    </p>
                  </div>

                  <div className="d-flex justify-content-center gap-3">
                    <button 
                      onClick={() => navigate(`/case/${caseId}`)}
                      className="btn btn-secondary"
                    >
                      Back to Case
                    </button>
                    <button 
                      onClick={() => navigate('/')}
                      className="btn btn-danger"
                    >
                      Back to Cases
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
    <div className="min-vh-100 bg-dark">
      <Header />
      
      <div className="container py-4">
        <div className="d-flex align-items-center mb-5">
          <button
            className="btn btn-secondary btn-sm me-3"
            onClick={() => navigate(`/case/${caseId}`)}
          >
            <ArrowLeft className="me-2" style={{ width: '16px', height: '16px' }} />
            Back to Case
          </button>
          
          <div>
            <h1 className="h2 text-white mb-1">
              Solve the Case: {crimeCase?.title}
            </h1>
            <p className="text-muted mb-0">
              Select the suspect, evidence, and motive to solve this case
            </p>
          </div>
        </div>

        {/* Suspect Selection */}
        <div className="card bg-dark border-secondary mb-5">
          <div className="card-header">
            <h3 className="card-title text-white">
              Select the Suspect
              {selectedSuspect && (
                <span className="badge bg-success ms-2">Selected</span>
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
                      isSelected={selectedSuspect === suspect.id}
                      onToggle={() => toggleSuspect(suspect.id)}
                      imageColor={getImageColor(index)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted text-center py-4">No suspects available</p>
            )}
          </div>
        </div>

        {/* Evidence Selection */}
        <div className="card bg-dark border-secondary mb-5">
          <div className="card-header">
            <h3 className="card-title text-white">
              Select Key Evidence
              {selectedEvidences.length > 0 && (
                <span className="badge bg-primary ms-2">
                  {selectedEvidences.length} selected
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
                      title={(evidence as any).name || evidence.title}
                      isSelected={selectedEvidences.includes(evidence.id)}
                      onToggle={() => toggleEvidence(evidence.id)}
                      imageColor={getImageColor(index)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted text-center py-4">No evidence available</p>
            )}
          </div>
        </div>

        {/* Motive Selection */}
        <div className="card bg-dark border-secondary mb-5">
          <div className="card-header">
            <h3 className="card-title text-white">
              Select the Motive
              {selectedMotive && (
                <span className="badge bg-warning ms-2">Selected</span>
              )}
            </h3>
          </div>
          <div className="card-body">
            {motives?.items && motives.items.length > 0 ? (
              <div className="row g-3">
                {motives.items.map((motive, index) => (
                  <div key={motive.id} className="col-md-4 col-lg-3">
                    <MotiveSelectionCard
                      title={(motive as any).name || motive.title}
                      isSelected={selectedMotive === motive.id}
                      onToggle={() => toggleMotive(motive.id)}
                      imageColor={getImageColor(index)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted text-center py-4">No motives available</p>
            )}
          </div>
        </div>

        {/* Submit Solution */}
        <div className="text-center">
          <button
            onClick={handleSolutionSubmit}
            className="btn btn-danger btn-lg px-5 py-3"
            disabled={!selectedSuspect || selectedEvidences.length === 0 || !selectedMotive || createSolutionMutation.isPending}
          >
            {createSolutionMutation.isPending ? 'Submitting...' : 'Submit Solution'}
          </button>
          
          {(!selectedSuspect || selectedEvidences.length === 0 || !selectedMotive) && (
            <p className="text-muted mt-3 small">
              Please select a suspect, at least one piece of evidence, and a motive
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseSolution;
