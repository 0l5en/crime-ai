
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import CaseOverview from "./CaseOverview";
import EvidenceCard from "./EvidenceCard";
import EvidenceReportCard from "./EvidenceReportCard";
import SuspectCard from "./SuspectCard";
import WitnessCard from "./WitnessCard";

interface CaseContentProps {
  activeTab: string;
  caseId: string;
  crimeCase?: any;
  crimeScene?: any;
  evidences?: any;
  suspects?: any;
  witnesses?: any;
  motives?: any;
  victims?: any;
  forensicPathologist?: any;
  sceneLoading: boolean;
  evidencesLoading: boolean;
  suspectsLoading: boolean;
  witnessesLoading: boolean;
  motivesLoading: boolean;
  victimsLoading: boolean;
  pathologistLoading: boolean;
  onInterrogate: (person: any) => void;
  getImageColor: (index: number) => string;
  selectedEvidence?: any;
  evidenceReports?: any;
  reportsLoading?: boolean;
  onEvidenceSelect?: (evidence: any) => void;
  onBackToEvidenceList?: () => void;
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
  victims,
  forensicPathologist,
  sceneLoading,
  evidencesLoading,
  suspectsLoading,
  witnessesLoading,
  motivesLoading,
  victimsLoading,
  pathologistLoading,
  onInterrogate,
  getImageColor,
  selectedEvidence,
  evidenceReports,
  reportsLoading,
  onEvidenceSelect,
  onBackToEvidenceList
}: CaseContentProps) => {
  const navigate = useNavigate();

  const handleEvidenceClick = (evidenceId: number) => {
    const evidence = evidences?.items?.find((e: any) => e.id === evidenceId);
    if (evidence && onEvidenceSelect) {
      onEvidenceSelect(evidence);
    }
  };

  const getEvidenceTypeColor = (type: string) => {
    switch (type) {
      case 'FORENSIC':
        return 'bg-primary';
      case 'BALLISTIC':
        return 'bg-danger';
      case 'DIGITAL':
        return 'bg-success';
      case 'DOCUMENT':
        return 'bg-warning';
      case 'TRACE':
        return 'bg-info';
      case 'OTHER':
      default:
        return 'bg-secondary';
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
    // Show evidence detail view if an evidence is selected
    if (selectedEvidence) {
      return (
        <>
          {/* Back Button */}
          <div className="mb-4">
            <button 
              onClick={onBackToEvidenceList}
              className="btn btn-outline-light d-flex align-items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back to Case
            </button>
          </div>

          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <button 
                  onClick={onBackToEvidenceList}
                  className="btn btn-link text-light p-0 text-decoration-none"
                >
                  Case {caseId}
                </button>
              </li>
              <li className="breadcrumb-item active text-muted" aria-current="page">
                Evidence Details
              </li>
            </ol>
          </nav>

          {/* Evidence Header */}
          <div className="mb-4">
            <div className="d-flex align-items-center gap-3 mb-3">
              <h2 className="text-light mb-0">{selectedEvidence.title}</h2>
              {selectedEvidence.evidenceType && (
                <span className={`badge ${getEvidenceTypeColor(selectedEvidence.evidenceType)} badge-pill fs-6`}>
                  {selectedEvidence.evidenceType}
                </span>
              )}
            </div>
            <p className="text-muted mb-2">{selectedEvidence.description}</p>
          </div>

          {/* Document Content Section - Only show for DOCUMENT type evidences */}
          {selectedEvidence.evidenceType === 'DOCUMENT' && selectedEvidence.documentContent && (
            <>
              <div className="mb-4">
                <div className="card bg-dark border-secondary text-light">
                  <div className="card-header">
                    <h5 className="mb-0 text-light fw-semibold">Document Content</h5>
                  </div>
                  <div className="card-body">
                    <div className="text-light" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                      {selectedEvidence.documentContent}
                    </div>
                  </div>
                </div>
              </div>
              <hr className="border-secondary mb-4" />
            </>
          )}

          {!selectedEvidence.documentContent && selectedEvidence.evidenceType === 'DOCUMENT' && (
            <hr className="border-secondary mb-4" />
          )}

          {selectedEvidence.evidenceType !== 'DOCUMENT' && (
            <hr className="border-secondary mb-4" />
          )}

          {/* Evidence Reports Section */}
          <div>
            <h3 className="text-light mb-4">Evidence Reports & Discussions</h3>
            
            {reportsLoading ? (
              <div className="text-center text-muted py-5">
                <p>Loading evidence reports...</p>
              </div>
            ) : evidenceReports?.items && evidenceReports.items.length > 0 ? (
              <div className="row">
                {evidenceReports.items.map((report: any) => (
                  <div key={report.id} className="col-12 mb-4">
                    <EvidenceReportCard
                      id={report.id}
                      analysis={report.analysis}
                      methods={report.methods}
                      conclusion={report.conclusion}
                      personId={report.personId}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted py-5">
                <p>No evidence reports available for this evidence</p>
              </div>
            )}
          </div>
        </>
      );
    }

    // Show evidence list (default view)
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
                  imageUrl={evidence.imageUrl}
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
                  imageUrl={suspect.imageUrl}
                  onInterrogate={() => onInterrogate(suspect)}
                  alibiContent={suspect.alibi?.content}
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
                  imageUrl={witness.imageUrl}
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
