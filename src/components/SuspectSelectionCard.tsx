
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface SuspectSelectionCardProps {
  name: string;
  isSelected: boolean;
  onToggle: () => void;
  imageColor?: string;
}

const SuspectSelectionCard = ({ 
  name, 
  isSelected,
  onToggle,
  imageColor = 'bg-gradient-to-br from-slate-600 to-slate-800'
}: SuspectSelectionCardProps) => {
  // Get initials from name for avatar fallback
  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };

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
        <Avatar className="h-16 w-16">
          <div className={`${imageColor} h-full w-full flex items-center justify-center`}>
            <AvatarFallback className="bg-transparent text-white text-lg font-semibold">
              {getInitials(name)}
            </AvatarFallback>
          </div>
        </Avatar>
        
        <div className="text-center">
          <h3 className="text-lg font-semibold text-zinc-200">{name}</h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuspectSelectionCard;
