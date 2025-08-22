
interface EvidenceCardProps {
  title: string;
  description: string;
  location: string;
  analysisResult: string;
  imageColor: string;
  evidenceType?: "FORENSIC" | "BALLISTIC" | "DIGITAL" | "DOCUMENT" | "TRACE" | "OTHER";
}

const getEvidenceTypeColor = (type: string) => {
  switch (type) {
    case 'FORENSIC':
      return 'bg-primary'; // Blue
    case 'BALLISTIC':
      return 'bg-danger'; // Red
    case 'DIGITAL':
      return 'bg-success'; // Green
    case 'DOCUMENT':
      return 'bg-warning'; // Yellow
    case 'TRACE':
      return 'bg-info'; // Light Blue
    case 'OTHER':
    default:
      return 'bg-secondary'; // Gray
  }
};

const EvidenceCard = ({ title, description, location, analysisResult, imageColor, evidenceType }: EvidenceCardProps) => {
  return (
    <div className="card bg-dark border-secondary text-light card-hover position-relative">
      {evidenceType && (
        <div className="position-absolute top-0 end-0 m-2" style={{ zIndex: 10 }}>
          <span className={`badge ${getEvidenceTypeColor(evidenceType)} badge-pill fs-6`}>
            {evidenceType}
          </span>
        </div>
      )}
      <div className="card-header p-0">
        <div className={`${imageColor} d-flex align-items-center justify-content-center`} style={{ height: '12rem' }}>
          <div className="bg-light bg-opacity-25 rounded d-flex align-items-center justify-content-center" style={{ width: '4rem', height: '4rem' }}>
            <div className="bg-light bg-opacity-50 rounded" style={{ width: '2rem', height: '2rem' }}></div>
          </div>
        </div>
      </div>
      <div className="card-body p-4">
        <h5 className="card-title mb-3 text-light">{title}</h5>
        <p className="card-text text-muted mb-4">
          {description}
        </p>
        <div className="small">
          <div className="text-muted mb-2">
            <span className="fw-semibold text-light">Location:</span> {location}
          </div>
          <div className="text-muted">
            <span className="fw-semibold text-light">Analysis:</span> {analysisResult}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvidenceCard;
