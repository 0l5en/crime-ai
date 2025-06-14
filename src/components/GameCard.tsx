
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface GameCardProps {
  title: string;
  description: string;
  imageColor: string;
}

const GameCard = ({ title, description, imageColor }: GameCardProps) => {
  return (
    <Card className="bg-slate-800 border-slate-700 text-white hover:bg-slate-750 transition-colors cursor-pointer">
      <CardHeader className="p-0">
        <div className={`h-48 ${imageColor} rounded-t-lg flex items-center justify-center`}>
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg"></div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="text-xl mb-3">{title}</CardTitle>
        <CardDescription className="text-gray-300">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default GameCard;
