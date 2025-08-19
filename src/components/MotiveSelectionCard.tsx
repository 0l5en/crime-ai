
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
  imageColor = 'bg-secondary'
}: MotiveSelectionCardProps) => {
  return (
    <Card 
      className={`
        card-hover bg-dark text-light
        ${isSelected 
          ? 'border-danger border-2' 
          : 'border-secondary'
        }
      `}
      onClick={onToggle}
      style={{ cursor: 'pointer' }}
    >
      <CardContent className="p-3 d-flex flex-column align-items-center">
        <div className={`mb-3 rounded ${imageColor} d-flex align-items-center justify-content-center`} 
             style={{ width: '64px', height: '64px' }}>
          <div className="bg-light bg-opacity-25 rounded" style={{ width: '32px', height: '32px' }}></div>
        </div>
        
        <div className="text-center">
          <h5 className="card-title text-light mb-0">{title}</h5>
        </div>
      </CardContent>
    </Card>
  );
};

export default MotiveSelectionCard;
