import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface CaseHeaderProps {
  caseId: string;
  title?: string;
  summary?: string;
}

const CaseHeader = ({ caseId, title, summary }: CaseHeaderProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation('caseDashboard');

  return (
    <div className="d-flex align-items-center justify-content-between mb-4">
      <div>
        <h1 className="h2 mb-1 fw-bold">
          {title || t('header.loading')}
        </h1>
        <p className="text-muted mb-0">
          {summary || t('header.loadingDetails')}
        </p>
      </div>

      <button
        disabled={false}
        onClick={() => navigate(`/case/${caseId}/solution`)}
        className="btn btn-primary btn-lg ms-4 text-nowrap" style={{ fontSize: '1.3rem' }}>
        {t('header.solveCase')}
      </button>
    </div>
  );
};

export default CaseHeader;
