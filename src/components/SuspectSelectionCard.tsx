
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
    <div 
      className={`
        bg-dark text-light card-hover card
        ${isSelected 
          ? 'border-danger border-2' 
          : 'border-secondary'
        }
      `}
      onClick={onToggle}
      style={{ cursor: 'pointer' }}
    >
      <div className="card-body p-4 d-flex flex-column align-items-center">
        <div className="mb-3" style={{ width: '4rem', height: '4rem' }}>
          <div className={`${imageColor} h-100 w-100 d-flex align-items-center justify-content-center rounded-circle`}>
            <span className="text-white fw-semibold">
              {getInitials(name)}
            </span>
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="h6 fw-semibold text-light mb-0">{name}</h3>
        </div>
      </div>
    </div>
  );
};

export default SuspectSelectionCard;
