
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import EvidenceReportCard from "@/components/EvidenceReportCard";
import { useEvidenceReports } from "@/hooks/useEvidenceReports";
import { useCaseEvidences } from "@/hooks/useCaseEvidences";

const EvidenceDetails = () => {
  const { caseId, evidenceId } = useParams<{ caseId: string; evidenceId: string }>();
  const navigate = useNavigate();

  const { data: evidences, isLoading: evidencesLoading } = useCaseEvidences(caseId || '');
  const { data: evidenceReports, isLoading: reportsLoading } = useEvidenceReports(evidenceId || '');

  // Find the specific evidence from the case evidences
  const evidence = evidences?.items?.find(e => e.id.toString() === evidenceId);

  const handleBackClick = () => {
    navigate(`/case/${caseId}?tab=evidence`);
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

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#1a1a1a' }}>
      <Header />
      
      <div className="container-fluid py-4" style={{ maxWidth: '1200px' }}>
        {/* Back Button */}
        <div className="mb-4">
          <button 
            onClick={handleBackClick}
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
                onClick={handleBackClick}
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
        {evidencesLoading ? (
          <div className="text-center text-muted py-3">
            <p>Loading evidence details...</p>
          </div>
        ) : evidence ? (
          <div className="mb-4">
            <div className="d-flex align-items-center gap-3 mb-3">
              <h2 className="text-light mb-0">{evidence.title}</h2>
              {evidence.evidenceType && (
                <span className={`badge ${getEvidenceTypeColor(evidence.evidenceType)} badge-pill fs-6`}>
                  {evidence.evidenceType}
                </span>
              )}
            </div>
            <p className="text-muted mb-2">{evidence.description}</p>
          </div>
        ) : (
          <div className="text-center text-muted py-3">
            <p>Evidence not found</p>
          </div>
        )}

        {/* Document Content Section - Only show for DOCUMENT type evidences */}
        {evidence && evidence.evidenceType === 'DOCUMENT' && evidence.documentContent && (
          <>
            <div className="mb-4">
              <div className="card bg-dark border-secondary text-light">
                <div className="card-header">
                  <h5 className="mb-0 text-light fw-semibold">Document Content</h5>
                </div>
                <div className="card-body">
                  <div className="text-light" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                    {evidence.documentContent}
                  </div>
                </div>
              </div>
            </div>
            <hr className="border-secondary mb-4" />
          </>
        )}

        {!evidence?.documentContent && evidence?.evidenceType === 'DOCUMENT' && (
          <hr className="border-secondary mb-4" />
        )}

        {evidence?.evidenceType !== 'DOCUMENT' && (
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
              {evidenceReports.items.map((report) => (
                <div key={report.id} className="col-12 mb-4">
                  <EvidenceReportCard
                    id={report.id}
                    report={report.report}
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
      </div>
    </div>
  );
};

export default EvidenceDetails;
