
interface EvidenceSelectionCardProps {
  title: string;
  isSelected: boolean;
  onToggle: () => void;
  imageColor?: string;
}

const EvidenceSelectionCard = ({ 
  title, 
  isSelected,
  onToggle,
  imageColor = 'bg-gradient-secondary'
}: EvidenceSelectionCardProps) => {
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
        <div className={`${imageColor} rounded d-flex align-items-center justify-content-center mb-3`} style={{ width: '4rem', height: '4rem' }}>
          <div className="bg-light bg-opacity-25 rounded" style={{ width: '2rem', height: '2rem' }}></div>
        </div>
        
        <div className="text-center">
          <h3 className="h6 fw-semibold text-light mb-0">{title}</h3>
        </div>
      </div>
    </div>
  );
};

export default EvidenceSelectionCard;
