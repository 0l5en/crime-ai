
import { Card, CardContent } from '@/components/ui/card';

interface MotiveSelectionCardProps {
  title: string;
  isSelected: boolean;
  onToggle: () => void;
  imageColor?: string;
}

const MotiveSelectionCard = ({ 
  title, 
  isSelected,
  onToggle,
  imageColor = 'bg-gradient-to-br from-slate-600 to-slate-800'
}: MotiveSelectionCardProps) => {
  return (
    <Card 
      className={`
        bg-zinc-900 text-zinc-200 cursor-pointer transition-all duration-200 hover:shadow-lg
        ${isSelected 
          ? 'border-red-600 border-2 hover:shadow-red-600/30' 
          : 'border-zinc-600 hover:border-zinc-500'
        }
      `}
      onClick={onToggle}
    >
      <CardContent className="p-4 flex flex-col items-center space-y-3">
        <div className={`h-16 w-16 ${imageColor} rounded-lg flex items-center justify-center`}>
          <div className="w-8 h-8 bg-white bg-opacity-20 rounded"></div>
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-semibold text-zinc-200">{title}</h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default MotiveSelectionCard;
