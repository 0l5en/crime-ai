
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  
  const createSolutionMutation = useCreateSolutionAttempt();

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
            <Button
              variant="secondary" 
              size="sm"
              onClick={() => {
                setShowResult(false);
                setSolutionResult(null);
              }}
              className="me-3"
            >
              <ArrowLeft className="me-2" style={{ width: '16px', height: '16px' }} />
              Try Again
            </Button>
            
            <h1 className="h2 text-white mb-0">Case Solution Result</h1>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <Card className={`text-center border-3 ${solutionResult.isCorrect ? 'border-success bg-success bg-opacity-10' : 'border-danger bg-danger bg-opacity-10'}`}>
                <CardContent className="p-5">
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
                    <Button 
                      onClick={() => navigate(`/case/${caseId}`)}
                      variant="secondary"
                    >
                      Back to Case
                    </Button>
                    <Button 
                      onClick={() => navigate('/')}
                      variant="danger"
                    >
                      Back to Cases
                    </Button>
                  </div>
                </CardContent>
              </Card>
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
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate(`/case/${caseId}`)}
            className="me-3"
          >
            <ArrowLeft className="me-2" style={{ width: '16px', height: '16px' }} />
            Back to Case
          </Button>
          
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
        <Card className="bg-dark border-secondary mb-5">
          <CardHeader>
            <CardTitle className="text-white">
              Select the Suspect
              {selectedSuspect && (
                <Badge variant="success" className="ms-2">Selected</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        {/* Evidence Selection */}
        <Card className="bg-dark border-secondary mb-5">
          <CardHeader>
            <CardTitle className="text-white">
              Select Key Evidence
              {selectedEvidences.length > 0 && (
                <Badge variant="primary" className="ms-2">
                  {selectedEvidences.length} selected
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        {/* Motive Selection */}
        <Card className="bg-dark border-secondary mb-5">
          <CardHeader>
            <CardTitle className="text-white">
              Select the Motive
              {selectedMotive && (
                <Badge variant="warning" className="ms-2">Selected</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        {/* Submit Solution */}
        <div className="text-center">
          <Button
            onClick={handleSolutionSubmit}
            variant="danger"
            size="lg"
            disabled={!selectedSuspect || selectedEvidences.length === 0 || !selectedMotive || createSolutionMutation.isPending}
            className="px-5 py-3"
          >
            {createSolutionMutation.isPending ? 'Submitting...' : 'Submit Solution'}
          </Button>
          
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
