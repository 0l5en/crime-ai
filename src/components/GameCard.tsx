
interface GameCardProps {
  title: string;
  description: string;
  difficulty: 'Leicht' | 'Mittel' | 'Schwer';
  estimatedTime: string;
  caseId: string;
  onClick: () => void;
}

const GameCard = ({ title, description, difficulty, estimatedTime, caseId, onClick }: GameCardProps) => {
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
      onClick={onClick}
      data-testid="case-card"
      data-case-id={caseId}
      style={{ cursor: 'pointer' }}
    >
      <div className="card-body d-flex flex-column">
        <h3 className="card-title h5 text-light mb-3" data-testid="case-title">{title}</h3>
        <p className="card-text text-secondary flex-grow-1 mb-3" data-testid="case-description">
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
              onClick();
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
