
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    <Card 
      className="bg-dark border-secondary text-light card-hover position-relative"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      {!isLoading && isSolved && userId && (
        <div className="position-absolute top-0 end-0 p-3" style={{ zIndex: '10' }}>
          <Badge className="bg-success text-white border-success d-flex align-items-center">
            <BadgeCheck className="me-1" style={{ width: '16px', height: '16px' }} />
            Solved
          </Badge>
        </div>
      )}
      <CardHeader className="p-0">
        <div className={`${imageColor} d-flex align-items-center justify-content-center`} style={{ height: '12rem' }}>
          <div className="bg-light bg-opacity-25 rounded" style={{ width: '4rem', height: '4rem' }}></div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="h5 mb-3 text-light">{title}</CardTitle>
        <CardDescription className="text-muted">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default GameCard;
