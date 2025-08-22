
import { format } from 'date-fns';

interface EvidenceReportCardProps {
  id: number;
  reportType: string;
  content: string;
  createdAt: string;
  createdBy: string;
}

const EvidenceReportCard = ({ id, reportType, content, createdAt, createdBy }: EvidenceReportCardProps) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd.MM.yyyy HH:mm');
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  return (
    <div className="card bg-dark border-secondary text-light mb-3">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h6 className="mb-0 text-light fw-semibold">{reportType}</h6>
        <small className="text-muted">ID: {id}</small>
      </div>
      <div className="card-body">
        <p className="card-text text-light mb-3">{content}</p>
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">
            <span className="fw-semibold text-light">Created by:</span> {createdBy}
          </small>
          <small className="text-muted">
            <span className="fw-semibold text-light">Date:</span> {formatDate(createdAt)}
          </small>
        </div>
      </div>
    </div>
  );
};

export default EvidenceReportCard;
