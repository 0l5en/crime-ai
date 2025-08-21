
import { useNavigate } from 'react-router-dom';

interface GameCardProps {
  title: string;
  description: string;
  imageColor?: string;
  caseId: string;
  userId?: string;
  difficulty?: 'Leicht' | 'Mittel' | 'Schwer';
  estimatedTime?: string;
  onClick?: () => void;
}

const GameCard = ({ 
  title, 
  description, 
  imageColor, 
  caseId, 
  userId,
  difficulty = 'Mittel',
  estimatedTime = '30-45 min',
  onClick
}: GameCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
    navigate(`/case/${caseId}`);
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Leicht': return 'text-success';
      case 'Mittel': return 'text-warning'; 
      case 'Schwer': return 'text-danger';
      default: return 'text-secondary';
    }
  };

  return (
    <div 
      className="card bg-dark border-secondary text-light card-hover h-100"
      onClick={handleCardClick}
      data-testid="case-card"
      data-case-id={caseId}
      style={{ cursor: 'pointer' }}
    >
      <div className="card-header p-0">
        <div className={`${imageColor || 'bg-gradient-red'} d-flex align-items-center justify-content-center`} style={{ height: '12rem' }}>
          <div className="bg-light bg-opacity-25 rounded d-flex align-items-center justify-content-center" style={{ width: '4rem', height: '4rem' }}>
            <div className="bg-light bg-opacity-50 rounded" style={{ width: '2rem', height: '2rem' }}></div>
          </div>
        </div>
      </div>
      <div className="card-body p-4 d-flex flex-column">
        <h5 className="card-title mb-3 text-light" data-testid="case-title">{title}</h5>
        <p className="card-text text-muted flex-grow-1 mb-4" data-testid="case-description">
          {description}
        </p>
        
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <div className="d-flex flex-column gap-1">
            <span className={`small fw-medium ${getDifficultyColor(difficulty)}`} data-testid="case-difficulty">
              {difficulty}
            </span>
            <span className="small text-muted" data-testid="case-time">
              <i className="bi bi-clock me-1"></i>
              {estimatedTime}
            </span>
          </div>
          
          <button 
            className="btn btn-danger btn-sm"
            data-testid="case-start-button"
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
          >
            <i className="bi bi-play-fill me-1"></i>
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
