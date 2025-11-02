import { Star } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface StarRatingProps {
  rating?: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: number;
  showCount?: boolean;
  count?: number;
}

const StarRating = ({ 
  rating = 0, 
  onRatingChange, 
  readonly = false, 
  size = 20,
  showCount = false,
  count = 0
}: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);
  const { t } = useTranslation('caseDashboard');

  // Calculate fill percentage for each star (0-100)
  const getStarFillPercentage = (starNumber: number, displayRating: number): number => {
    if (displayRating >= starNumber) {
      return 100; // Full star
    } else if (displayRating > starNumber - 1) {
      // Partial star - calculate percentage
      return (displayRating - (starNumber - 1)) * 100;
    }
    return 0; // Empty star
  };

  const handleStarClick = (starNumber: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(starNumber);
    }
  };

  const handleStarHover = (starNumber: number) => {
    if (!readonly) {
      setHoverRating(starNumber);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };

  // For interactive mode: show full stars on hover, otherwise show exact rating
  // For readonly mode: always show exact rating with partial stars
  const displayRating = readonly ? rating : (hoverRating || rating);

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((starNumber) => {
          const fillPercentage = getStarFillPercentage(starNumber, displayRating);
          
          return (
            <button
              key={starNumber}
              type="button"
              className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform bg-transparent border-0 p-0 relative`}
              onClick={() => handleStarClick(starNumber)}
              onMouseEnter={() => handleStarHover(starNumber)}
              onMouseLeave={handleMouseLeave}
              disabled={readonly}
              aria-label={readonly ? undefined : `Rate ${starNumber} stars`}
              style={{ display: 'inline-block' }}
            >
              {/* Background star (outline) */}
              <Star
                size={size}
                className="text-primary transition-colors"
                fill="none"
              />
              
              {/* Filled star with clip-path for partial fill */}
              {fillPercentage > 0 && (
                <Star
                  size={size}
                  className="fill-primary text-primary absolute top-0 left-0 transition-colors"
                  style={{
                    clipPath: `inset(0 ${100 - fillPercentage}% 0 0)`
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
      {showCount && count > 0 && (
        <span className="text-sm text-muted-foreground ml-1">
          ({count} {count === 1 ? t('rating.rating') : t('rating.ratings')})
        </span>
      )}
    </div>
  );
};

export default StarRating;