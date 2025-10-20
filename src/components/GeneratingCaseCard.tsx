import { format } from 'date-fns';

interface GeneratingCaseCardProps {
  attemptId: number;
  status: 'CREATED' | 'SUBSCRIBED';
  created: string;
}

const GeneratingCaseCard = ({ attemptId, status, created }: GeneratingCaseCardProps) => {
  const createdDate = new Date(created);
  const formattedDate = format(createdDate, 'dd.MM.yyyy HH:mm');
  
  const statusText = status === 'SUBSCRIBED' 
    ? 'Generating...' 
    : 'Waiting for payment...';
  
  const statusBadge = status === 'SUBSCRIBED'
    ? <span className="badge bg-warning text-dark">Generating...</span>
    : <span className="badge bg-info text-dark">Waiting for payment</span>;

  return (
    <div className="card bg-dark border-secondary text-light h-100" style={{ minHeight: '400px' }}>
      <div className="card-body d-flex flex-column justify-content-between p-4">
        {/* Generating animation/spinner */}
        <div className="text-center mb-3">
          <div className="spinner-border text-danger mb-3" role="status">
            <span className="visually-hidden">{statusText}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow-1">
          <h5 className="card-title mb-3 text-light">Case #{attemptId}</h5>
          <p className="card-text text-muted mb-2">
            <strong>Status:</strong> {statusText}
          </p>
          <p className="card-text text-muted mb-4">
            <strong>Created:</strong> {formattedDate}
          </p>
          <p className="card-text text-muted" style={{ textAlign: 'justify' }}>
            {status === 'SUBSCRIBED' 
              ? 'Generating your vacation rental case... This usually takes 2-3 minutes.'
              : 'Please complete the payment to start generation. The case will appear automatically when ready.'
            }
          </p>
        </div>

        {/* Footer with generating status */}
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column gap-1">
              {statusBadge}
              <small className="text-muted">
                {status === 'SUBSCRIBED' ? 'Available soon' : 'Awaiting payment'}
              </small>
            </div>
            <button 
              className="btn btn-secondary btn-sm" 
              disabled
              style={{ cursor: 'not-allowed' }}
            >
              <i className="bi bi-hourglass-split me-1"></i>
              Processing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratingCaseCard;
