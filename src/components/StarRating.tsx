import { Star } from 'lucide-react';
import { useState } from 'react';

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

  const displayRating = hoverRating || rating;

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((starNumber) => (
          <button
            key={starNumber}
            type="button"
            className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
            onClick={() => handleStarClick(starNumber)}
            onMouseEnter={() => handleStarHover(starNumber)}
            onMouseLeave={handleMouseLeave}
            disabled={readonly}
            aria-label={readonly ? undefined : `Rate ${starNumber} stars`}
          >
            <Star
              size={size}
              className={`${
                starNumber <= displayRating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              } transition-colors`}
            />
          </button>
        ))}
      </div>
      {showCount && count > 0 && (
        <span className="text-sm text-muted-foreground ml-1">
          ({count} {count === 1 ? 'Bewertung' : 'Bewertungen'})
        </span>
      )}
    </div>
  );
};

export default StarRating;