
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
  imageColor = 'bg-gradient-secondary'
}: SuspectSelectionCardProps) => {
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
        bg-dark text-light card-hover
        ${isSelected 
          ? 'border-danger border-2' 
          : 'border-secondary'
        }
      `}
      onClick={onToggle}
      style={{ cursor: 'pointer' }}
    >
      <CardContent className="p-4 d-flex flex-column align-items-center">
        <Avatar className="mb-3" style={{ width: '4rem', height: '4rem' }}>
          <div className={`${imageColor} h-100 w-100 d-flex align-items-center justify-content-center`}>
            <AvatarFallback className="bg-transparent text-white fw-semibold">
              {getInitials(name)}
            </AvatarFallback>
          </div>
        </Avatar>
        
        <div className="text-center">
          <h3 className="h6 fw-semibold text-light mb-0">{name}</h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuspectSelectionCard;
