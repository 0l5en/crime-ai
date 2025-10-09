import { useTranslation } from 'react-i18next';

interface EvidenceCardProps {
  title: string;
  description: string;
  location: string;
  analysisResult: string;
  imageColor: string;
  evidenceType?: "FORENSIC" | "BALLISTIC" | "DIGITAL" | "DOCUMENT" | "TRACE" | "OTHER";
  imageUrl?: string;
  onClick?: () => void;
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

const EvidenceCard = ({ title, description, location, analysisResult, imageColor, evidenceType, imageUrl, onClick }: EvidenceCardProps) => {
  const { t } = useTranslation('caseDashboard');
  
  return (
    <div
      className={`card border-secondary card-hover position-relative h-100 d-flex flex-column ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {evidenceType && (
        <div className="position-absolute top-0 end-0 m-2" style={{ zIndex: 10 }}>
          <span className={`badge ${getEvidenceTypeColor(evidenceType)} badge-pill fs-6`}>
            {evidenceType}
          </span>
        </div>
      )}
      <div className="card-header p-0">
        <div className={`${imageUrl ? '' : imageColor} d-flex align-items-center justify-content-center`} style={{ height: '12rem' }}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-100 h-100 object-fit-cover"
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div className="bg-light bg-opacity-25 rounded d-flex align-items-center justify-content-center" style={{ width: '4rem', height: '4rem' }}>
              <div className="bg-light bg-opacity-50 rounded" style={{ width: '2rem', height: '2rem' }}></div>
            </div>
          )}
        </div>
      </div>
      <div className="card-body p-4 flex-grow-1 d-flex flex-column">
        <h5 className="card-title mb-3">{title}</h5>
        <p className="card-text text-muted mb-4 flex-grow-1">
          {description}
        </p>
        <div className="small mt-auto">
          <div className="text-muted mb-2">
            <span className="fw-semibold">{t('evidence.location')}:</span> {location}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvidenceCard;
