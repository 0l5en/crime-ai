import { format } from 'date-fns';

interface GeneratingCaseCardProps {
  attemptId: number;
  created: string;
}

const GeneratingCaseCard = ({ attemptId, created }: GeneratingCaseCardProps) => {
  const createdDate = new Date(created);
  const formattedDate = format(createdDate, 'dd.MM.yyyy HH:mm');

  return (
    <div className="card bg-dark border-secondary text-light h-100" style={{ minHeight: '400px' }}>
      <div className="card-body d-flex flex-column justify-content-between p-4">
        {/* Content */}
        <div className="flex-grow-1">
          <h5 className="card-title mb-3 text-light">Case #{attemptId}</h5>
          <p className="card-text text-muted mb-2">
            <strong>Status:</strong> in progress
          </p>
          <p className="card-text text-muted mb-4">
            <strong>Created:</strong> {formattedDate}
          </p>
          <p className="card-text text-muted" style={{ textAlign: 'justify' }}>
            Generating your vacation rental case... This usually takes up to 24 hours.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GeneratingCaseCard;
