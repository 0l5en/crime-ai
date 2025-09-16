
interface SuspectSelectionCardProps {
  name: string;
  isSelected: boolean;
  onToggle: () => void;
  imageColor?: string;
  imageUrl?: string;
}

const SuspectSelectionCard = ({
  name,
  isSelected,
  onToggle,
  imageColor = 'bg-gradient-secondary',
  imageUrl
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
        card-hover card
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
            <span className="fw-semibold">
              {getInitials(name)}
            </span>
          </div>
        </div>

        <div className="text-center">
          <h3 className="h6 fw-semibold mb-0">{name}</h3>
        </div>
      </div>
    </div>
  );
};

export default SuspectSelectionCard;
