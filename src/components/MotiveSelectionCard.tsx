
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
    <div
      className={`
        card card-hover
        ${isSelected
          ? 'border-danger border-2'
          : 'border-secondary'
        }
      `}
      onClick={onToggle}
      style={{ cursor: 'pointer' }}
    >
      <div className="card-body p-3 d-flex flex-column align-items-center">
        <div className={`mb-3 rounded ${imageColor} d-flex align-items-center justify-content-center`}
          style={{ width: '64px', height: '64px' }}>
          <div className="bg-secondary bg-opacity-25 rounded" style={{ width: '32px', height: '32px' }}></div>
        </div>

        <div className="text-center">
          <h5 className="card-title mb-0">{title}</h5>
        </div>
      </div>
    </div>
  );
};

export default MotiveSelectionCard;
