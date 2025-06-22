
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
      className="bg-zinc-900 border-zinc-600 text-zinc-200 hover:border-red-600 hover:shadow-lg hover:shadow-red-600/20 transition-all cursor-pointer relative"
      onClick={handleClick}
    >
      {!isLoading && isSolved && userId && (
        <div className="absolute top-3 right-3 z-10">
          <Badge className="bg-green-600 hover:bg-green-600 text-white border-green-500">
            <BadgeCheck className="w-4 h-4 mr-1" />
            Solved
          </Badge>
        </div>
      )}
      <CardHeader className="p-0">
        <div className={`h-48 ${imageColor} rounded-t-lg flex items-center justify-center`}>
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg"></div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="text-xl mb-3 text-zinc-200">{title}</CardTitle>
        <CardDescription className="text-zinc-400">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default GameCard;
