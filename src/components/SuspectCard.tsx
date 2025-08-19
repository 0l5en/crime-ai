
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface SuspectCardProps {
  name: string;
  age: number;
  profession: string;
  maritalStatus: string;
  relationshipToCase: string;
  imageColor?: string;
  onInterrogate?: () => void;
}

const SuspectCard = ({ 
  name, 
  age, 
  profession, 
  maritalStatus, 
  relationshipToCase,
  imageColor = 'bg-gradient-secondary',
  onInterrogate
}: SuspectCardProps) => {
  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };

  return (
    <Card className="bg-dark border-secondary text-light card-hover">
      <CardHeader className="pb-3">
        <div className="d-flex align-items-center">
          <Avatar className="me-3" style={{ width: '4rem', height: '4rem' }}>
            <div className={`${imageColor} h-100 w-100 d-flex align-items-center justify-content-center`}>
              <AvatarFallback className="bg-transparent text-white fw-semibold">
                {getInitials(name)}
              </AvatarFallback>
            </div>
          </Avatar>
          <div className="flex-grow-1">
            <CardTitle className="h5 text-light mb-1">{name}</CardTitle>
            <Badge className="border-danger text-danger bg-transparent">
              {age} Jahre
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="d-flex flex-column gap-3">
        <div>
          <h4 className="small fw-medium text-muted mb-1">Beruf</h4>
          <p className="text-light mb-0">{profession}</p>
        </div>
        
        <div>
          <h4 className="small fw-medium text-muted mb-1">Familienstand</h4>
          <p className="text-light mb-0">{maritalStatus}</p>
        </div>
        
        <div>
          <h4 className="small fw-medium text-muted mb-1">Bezug zum Fall</h4>
          <p className="text-light small mb-0">{relationshipToCase}</p>
        </div>

        {onInterrogate && (
          <div className="pt-2">
            <Button
              onClick={onInterrogate}
              className="w-100 btn-danger"
              size="sm"
            >
              Interrogate
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SuspectCard;
