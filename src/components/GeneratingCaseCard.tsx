interface GeneratingCaseCardProps {
  venueName: string;
  tempId: string;
}

const GeneratingCaseCard = ({ venueName, tempId }: GeneratingCaseCardProps) => {
  return (
    <div className="card bg-dark border-secondary text-light h-100" style={{ minHeight: '400px' }}>
      <div className="card-body d-flex flex-column justify-content-between p-4">
        {/* Generating animation/spinner */}
        <div className="text-center mb-3">
          <div className="spinner-border text-danger mb-3" role="status">
            <span className="visually-hidden">Generating...</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow-1">
          <h5 className="card-title mb-3 text-light">{venueName}</h5>
          <p className="card-text text-muted mb-4" style={{ textAlign: 'justify' }}>
            Generating your vacation rental case...
            <br />
            <small className="text-muted">This usually takes 2-3 minutes. The case will appear automatically when ready.</small>
          </p>
        </div>

        {/* Footer with generating status */}
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column gap-1">
              <span className="badge bg-warning text-dark">Generating...</span>
              <small className="text-muted">Available soon</small>
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