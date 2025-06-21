
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface GameCardProps {
  title: string;
  description: string;
  imageColor: string;
  caseId: string;
}

const GameCard = ({ title, description, imageColor, caseId }: GameCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/case/${caseId}`);
  };

  return (
    <Card 
      className="bg-zinc-900 border-zinc-600 text-zinc-200 hover:border-red-600 hover:shadow-lg hover:shadow-red-600/20 transition-all cursor-pointer"
      onClick={handleClick}
    >
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
