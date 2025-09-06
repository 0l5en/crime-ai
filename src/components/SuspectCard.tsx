
interface SuspectCardProps {
  name: string;
  age: number;
  profession: string;
  maritalStatus: string;
  relationshipToCase: string;
  imageColor?: string;
  imageUrl?: string;
  alibiContent?: string;
  onInterrogate?: () => void;
}

const SuspectCard = ({ 
  name, 
  age, 
  profession, 
  maritalStatus, 
  relationshipToCase,
  imageColor = 'bg-gradient-secondary',
  imageUrl,
  alibiContent,
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
    <div 
      className="card bg-dark border-secondary text-light card-hover h-100 d-flex flex-column"
      data-testid="suspect-card"
      data-suspect-name={name}
    >
      <div className="card-header pb-3">
        <div className="d-flex align-items-center">
          <div className="me-3" style={{ width: '4rem', height: '4rem' }}>
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt={name}
                className="rounded-circle object-fit-cover"
                style={{ width: '4rem', height: '4rem' }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('d-none');
                }}
              />
            ) : null}
            <div className={`${imageColor} h-100 w-100 d-flex align-items-center justify-content-center rounded-circle ${imageUrl ? 'd-none' : ''}`}>
              <span className="text-white fw-semibold">
                {getInitials(name)}
              </span>
            </div>
          </div>
          <div className="flex-grow-1">
            <h5 className="card-title text-light mb-1" data-testid="suspect-name">{name}</h5>
            <span className="badge border-danger text-danger bg-transparent" data-testid="suspect-age">
              {age} Jahre
            </span>
          </div>
        </div>
      </div>
      
      <div className="card-body d-flex flex-column gap-3 flex-grow-1">
        <div>
          <h4 className="small fw-medium text-muted mb-1">Profession:</h4>
          <p className="text-light mb-0" data-testid="suspect-profession">{profession}</p>
        </div>
        
        <div>
          <h4 className="small fw-medium text-muted mb-1">Marital status:</h4>
          <p className="text-light mb-0" data-testid="suspect-marital-status">{maritalStatus}</p>
        </div>
        
        <div>
          <h4 className="small fw-medium text-muted mb-1">Relation to case:</h4>
          <p className="text-light small mb-0" data-testid="suspect-relationship">{relationshipToCase}</p>
        </div>
        {alibiContent &&
          <div>
            <h4 className="small fw-medium text-muted mb-1">Alibi:</h4>
            <p className="text-light small mb-0" data-testid="suspect-alibi">{alibiContent}</p>
          </div>
        }

        {onInterrogate && (
          <div className="pt-2 mt-auto">
            <button
              onClick={onInterrogate}
              className="btn btn-danger w-100 btn-sm"
              data-testid="suspect-interrogate-button"
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
