
interface EvidenceReportCardProps {
  id: number;
  report: string;
  personId?: number;
}

const EvidenceReportCard = ({ id, report, personId }: EvidenceReportCardProps) => {
  return (
    <div className="card bg-dark border-secondary text-light mb-3">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h6 className="mb-0 text-light fw-semibold">Evidence Report</h6>
        <small className="text-muted">ID: {id}</small>
      </div>
      <div className="card-body">
        <p className="card-text text-light mb-3">{report}</p>
        {personId && (
          <div className="d-flex justify-content-end">
            <small className="text-muted">
              <span className="fw-semibold text-light">Person ID:</span> {personId}
            </small>
          </div>
        )}
      </div>
    </div>
  );
};

export default EvidenceReportCard;
