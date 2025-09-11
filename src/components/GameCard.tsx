
import { useNavigate } from 'react-router-dom';

interface GameCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  caseId: string;
  userId?: string;
  difficulty?: 'Leicht' | 'Mittel' | 'Schwer';
  estimatedTime?: string;
  onClick?: () => void;
  hideDescription?: boolean;
}

const GameCard = ({
  title,
  description,
  imageUrl,
  caseId,
  userId,
  difficulty = 'Mittel',
  estimatedTime = '30-45 min',
  onClick,
  hideDescription = false
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
      className="card border-secondary card-hover h-100"
      onClick={handleCardClick}
      data-testid="case-card"
      data-case-id={caseId}
      style={{ cursor: 'pointer' }}
    >
      <img className="card-img-top" src={imageUrl} alt="Crime case image"></img>
      <div className="card-body p-4 d-flex flex-column">
        <h5 className="card-title mb-3" data-testid="case-title">{title}</h5>
        {!hideDescription && (
          <p className="card-text text-muted flex-grow-1 mb-4" data-testid="case-description" style={{ textAlign: 'justify' }}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default GameCard;
