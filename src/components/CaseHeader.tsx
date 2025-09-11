
import { useNavigate } from "react-router-dom";

interface CaseHeaderProps {
  caseId: string;
  title?: string;
  summary?: string;
}

const CaseHeader = ({ caseId, title, summary }: CaseHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="d-flex align-items-center justify-content-between mb-4">
      <div>
        <h1 className="h2 mb-1 fw-bold">
          {title || 'Loading...'}
        </h1>
        <p className="text-muted mb-0">
          {summary || 'Loading case details...'}
        </p>
      </div>

      <button
        disabled={false}
        onClick={() => navigate(`/case/${caseId}/solution`)}
        className="btn btn-primary btn-lg ms-4 text-nowrap" style={{ fontSize: '1.3rem' }}>
        Solve this case
      </button>
    </div>
  );
};

export default CaseHeader;
