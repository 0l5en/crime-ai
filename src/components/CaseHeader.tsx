
import { ArrowLeft, Scale } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CaseHeaderProps {
  caseId: string;
  title?: string;
  description?: string;
}

const CaseHeader = ({ caseId, title, description }: CaseHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="d-flex align-items-center justify-content-between mb-4">
      <div className="d-flex align-items-center">
        <button
          className="btn btn-secondary btn-sm me-3"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="me-2" style={{ width: '16px', height: '16px' }} />
          Back to Cases
        </button>
        
        <div>
          <h1 className="h2 text-white mb-1">
            {title || 'Loading...'}
          </h1>
          <p className="text-muted mb-0">
            {description || 'Loading case details...'}
          </p>
        </div>
      </div>

      <button
        onClick={() => navigate(`/case/${caseId}/solution`)}
        className="btn btn-primary-custom btn-lg"
      >
        <Scale className="me-2" style={{ width: '18px', height: '18px' }} />
        Solve this case
      </button>
    </div>
  );
};

export default CaseHeader;
