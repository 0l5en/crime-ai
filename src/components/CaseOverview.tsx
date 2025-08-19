
interface CaseOverviewProps {
  crimeCase?: any;
  crimeScene?: any;
  sceneLoading: boolean;
}

const CaseOverview = ({ crimeCase, crimeScene, sceneLoading }: CaseOverviewProps) => {
  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="card bg-dark border-secondary text-light">
          <div className="card-body p-4">
            <h3 className="h4 text-white mb-3">Case Description</h3>
            <p className="text-light mb-0">
              {crimeCase?.description || 'Loading case details...'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="col-12">
        <div className="card bg-dark border-secondary text-light">
          <div className="card-body p-4">
            <h3 className="h4 text-white mb-3">Crime Scene</h3>
            
            <div className="row">
              <div className="col-md-8">
                <h4 className="h5 text-white mb-2">
                  {(crimeScene as any)?.location || crimeScene?.title || 'Trafalgar Square'}
                </h4>
                <p className="text-light mb-0">
                  {sceneLoading 
                    ? 'Loading crime scene details...' 
                    : (crimeScene as any)?.initialAssessment || crimeScene?.description || 'Der Tatort befindet sich in der Nähe des Nelson\'s Column, umgeben von Touristen und Einheimischen. Die Leiche wurde zwischen den Löwenstatuen gefunden.'
                  }
                </p>
              </div>
              
              <div className="col-md-4">
                <div 
                  className="bg-secondary d-flex align-items-center justify-content-center rounded"
                  style={{ height: '200px' }}
                >
                  <div className="text-center text-muted">
                    <i className="bi bi-image" style={{ fontSize: '3rem' }}></i>
                    <div className="mt-2">Crime Scene Image</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseOverview;
