
import { BadgeCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCaseSolved } from "@/hooks/useCaseSolved";

interface GameCardProps {
  title: string;
  description: string;
  imageColor: string;
  caseId: string;
  userId?: string;
}

const GameCard = ({ title, description, imageColor, caseId, userId }: GameCardProps) => {
  const navigate = useNavigate();
  const { isSolved, isLoading } = useCaseSolved(caseId, userId);

  const handleClick = () => {
    navigate(`/case/${caseId}`);
  };

  return (
    <div 
      className="card bg-dark border-secondary text-light card-hover position-relative"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      {!isLoading && isSolved && userId && (
        <div className="position-absolute top-0 end-0 p-3" style={{ zIndex: '10' }}>
          <span className="badge bg-success text-white border-success d-flex align-items-center">
            <BadgeCheck className="me-1" style={{ width: '16px', height: '16px' }} />
            Solved
          </span>
        </div>
      )}
      <div className="card-header p-0">
        <div className={`${imageColor} d-flex align-items-center justify-content-center`} style={{ height: '12rem' }}>
          <div className="bg-light bg-opacity-25 rounded" style={{ width: '4rem', height: '4rem' }}></div>
        </div>
      </div>
      <div className="card-body p-4">
        <h5 className="card-title mb-3 text-light">{title}</h5>
        <p className="card-text text-muted">
          {description}
        </p>
      </div>
    </div>
  );
};

export default GameCard;
