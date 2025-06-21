
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
  imageColor = 'bg-gradient-to-br from-slate-600 to-slate-800',
  onInterrogate
}: SuspectCardProps) => {
  // Get initials from name for avatar fallback
  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };

  return (
    <Card className="bg-slate-800 border-slate-700 text-white hover:bg-slate-750 transition-colors duration-200">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <div className={`${imageColor} h-full w-full flex items-center justify-center`}>
              <AvatarFallback className="bg-transparent text-white text-lg font-semibold">
                {getInitials(name)}
              </AvatarFallback>
            </div>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-xl text-white mb-1">{name}</CardTitle>
            <Badge variant="outline" className="text-red-400 border-red-400">
              {age} Jahre
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-1">Beruf</h4>
          <p className="text-gray-200">{profession}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-1">Familienstand</h4>
          <p className="text-gray-200">{maritalStatus}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-1">Bezug zum Fall</h4>
          <p className="text-gray-200 text-sm leading-relaxed">{relationshipToCase}</p>
        </div>

        {onInterrogate && (
          <div className="pt-2">
            <Button
              onClick={onInterrogate}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
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
