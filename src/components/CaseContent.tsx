
import { useNavigate } from "react-router-dom";
import EvidenceCard from "./EvidenceCard";
import SuspectCard from "./SuspectCard";
import WitnessCard from "./WitnessCard";
import CaseOverview from "./CaseOverview";

interface CaseContentProps {
  activeTab: string;
  caseId: string;
  crimeCase?: any;
  crimeScene?: any;
  evidences?: any;
  suspects?: any;
  witnesses?: any;
  motives?: any;
  sceneLoading: boolean;
  evidencesLoading: boolean;
  suspectsLoading: boolean;
  witnessesLoading: boolean;
  motivesLoading: boolean;
  onInterrogate: (person: any) => void;
  getImageColor: (index: number) => string;
}

const CaseContent = ({
  activeTab,
  caseId,
  crimeCase,
  crimeScene,
  evidences,
  suspects,
  witnesses,
  motives,
  sceneLoading,
  evidencesLoading,
  suspectsLoading,
  witnessesLoading,
  motivesLoading,
  onInterrogate,
  getImageColor
}: CaseContentProps) => {
  const navigate = useNavigate();

  const handleEvidenceClick = (evidenceId: number) => {
    if (crimeCase?.id) {
      navigate(`/case/${crimeCase.id}/evidence/${evidenceId}`);
    }
  };

  if (activeTab === 'overview') {
    return (
      <CaseOverview 
        caseId={caseId}
        crimeCase={crimeCase}
        crimeScene={crimeScene}
        sceneLoading={sceneLoading}
      />
    );
  }

  if (activeTab === 'evidence') {
    return (
      <>
        {evidencesLoading ? (
          <div className="text-center text-muted py-5">
            <p>Loading evidence...</p>
          </div>
        ) : evidences?.items && evidences.items.length > 0 ? (
          <div className="row g-4">
            {evidences.items.map((evidence: any, index: number) => (
              <div key={evidence.id} className="col-md-6 col-lg-4">
                <EvidenceCard
                  title={(evidence as any).name || evidence.title}
                  description={evidence.description}
                  location={(evidence as any).location || 'Unknown location'}
                  analysisResult={(evidence as any).analysisResult || 'Pending analysis'}
                  imageColor={getImageColor(index)}
                  evidenceType={evidence.evidenceType}
                  onClick={() => handleEvidenceClick(evidence.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted py-5">
            <p>No evidence available for this case</p>
          </div>
        )}
      </>
    );
  }

  if (activeTab === 'suspects') {
    return (
      <>
        {suspectsLoading ? (
          <div className="text-center text-muted py-5">
            <p>Loading suspects...</p>
          </div>
        ) : suspects?.items && suspects.items.length > 0 ? (
          <div className="row g-4">
            {suspects.items.map((suspect: any, index: number) => (
              <div key={suspect.id} className="col-md-6 col-lg-4">
                <SuspectCard
                  name={suspect.name}
                  age={suspect.age}
                  profession={suspect.profession}
                  maritalStatus={suspect.maritalStatus}
                  relationshipToCase={suspect.relationshipToCase}
                  imageColor={getImageColor(index)}
                  onInterrogate={() => onInterrogate(suspect)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted py-5">
            <p>No suspects identified for this case</p>
          </div>
        )}
      </>
    );
  }

  if (activeTab === 'witnesses') {
    return (
      <>
        {witnessesLoading ? (
          <div className="text-center text-muted py-5">
            <p>Loading witnesses...</p>
          </div>
        ) : witnesses?.items && witnesses.items.length > 0 ? (
          <div className="row g-4">
            {witnesses.items.map((witness: any, index: number) => (
              <div key={witness.id} className="col-md-6 col-lg-4">
                <WitnessCard
                  name={witness.name}
                  age={witness.age}
                  profession={witness.profession}
                  maritalStatus={witness.maritalStatus}
                  relationshipToCase={witness.relationshipToCase}
                  imageColor={getImageColor(index)}
                  onInterrogate={() => onInterrogate(witness)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted py-5">
            <p>No witnesses identified for this case</p>
          </div>
        )}
      </>
    );
  }

  return null;
};

export default CaseContent;
