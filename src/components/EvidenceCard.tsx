
interface EvidenceCardProps {
  title: string;
  description: string;
  location: string;
  analysisResult: string;
  imageColor: string;
}

const EvidenceCard = ({ title, description, location, analysisResult, imageColor }: EvidenceCardProps) => {
  return (
    <div className="card bg-dark border-secondary text-light card-hover">
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
