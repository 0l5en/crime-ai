import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';
import { useTranslation } from 'react-i18next';

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
  averageRating?: number;
  ratingCount?: number;
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
  hideDescription = false,
  averageRating,
  ratingCount
}: GameCardProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation('cases');

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
        
        {/* Rating Display */}
        {(averageRating !== undefined && averageRating > 0) || (ratingCount !== undefined && ratingCount > 0) ? (
          <div className="mt-auto">
            <StarRating
              rating={averageRating || 0}
              readonly={true}
              size={16}
              showCount={true}
              count={ratingCount || 0}
            />
          </div>
        ) : (
          <div className="mt-auto">
            <p className="text-muted small mb-0">{t('card.notYetRated')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameCard;
