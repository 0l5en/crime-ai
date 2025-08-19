
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
    <div className="card bg-dark border-secondary text-light card-hover">
      <div className="card-header pb-3">
        <div className="d-flex align-items-center">
          <div className="me-3" style={{ width: '4rem', height: '4rem' }}>
            <div className={`${imageColor} h-100 w-100 d-flex align-items-center justify-content-center rounded-circle`}>
              <span className="text-white fw-semibold">
                {getInitials(name)}
              </span>
            </div>
          </div>
          <div className="flex-grow-1">
            <h5 className="card-title text-light mb-1">{name}</h5>
            <span className="badge border-danger text-danger bg-transparent">
              {age} Jahre
            </span>
          </div>
        </div>
      </div>
      
      <div className="card-body d-flex flex-column gap-3">
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
            <button
              onClick={onInterrogate}
              className="btn btn-danger w-100 btn-sm"
            >
              Interrogate
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuspectCard;
