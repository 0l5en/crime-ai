
import { Scale } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CaseHeaderProps {
  caseId: string;
  title?: string;
  summary?: string;
}

const CaseHeader = ({ caseId, title, summary }: CaseHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="d-flex align-items-center justify-content-between mb-4 px-3">
      <div>
        <h1 className="h2 text-white mb-1 fw-bold">
          {title || 'Loading...'}
        </h1>
        <p className="text-muted mb-0">
          {summary || 'Loading case details...'}
        </p>
      </div>

      <button
        onClick={() => navigate(`/case/${caseId}/solution`)}
        className="btn btn-danger btn-lg px-4"
        style={{ backgroundColor: '#CB191C', borderColor: '#CB191C' }}
      >
        <Scale className="me-2" style={{ width: '18px', height: '18px' }} />
        Solve this case
      </button>
    </div>
  );
};

export default CaseHeader;
