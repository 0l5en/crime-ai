
import { Mountain } from "lucide-react";

interface CaseOverviewProps {
  crimeCase?: any;
  crimeScene?: any;
  sceneLoading: boolean;
}

const CaseOverview = ({ crimeCase, crimeScene, sceneLoading }: CaseOverviewProps) => {
  return (
    <div className="row g-4">
      <div className="col-12">
        <div 
          className="card border-0 text-light"
          style={{ backgroundColor: '#2a2a2a' }}
        >
          <div className="card-body p-4">
            <h3 className="h4 text-white mb-3">Case Description</h3>
            <p className="text-light mb-0" style={{ lineHeight: '1.6' }}>
              {crimeCase?.description || 'Loading case details...'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="col-12">
        <div 
          className="card border-0 text-light"
          style={{ backgroundColor: '#2a2a2a' }}
        >
          <div className="card-body p-4">
            <h3 className="h4 text-white mb-3">Crime Scene</h3>
            
            <div className="row">
              <div className="col-md-8">
                <h4 className="h5 text-white mb-3">
                  {(crimeScene as any)?.location || crimeScene?.title || 'Trafalgar Square'}
                </h4>
                <p className="text-light mb-0" style={{ lineHeight: '1.6' }}>
                  {sceneLoading 
                    ? 'Loading crime scene details...' 
                    : (crimeScene as any)?.initialAssessment || crimeScene?.description || 'Der Tatort befindet sich in der Nähe des Nelson\'s Column, umgeben von Touristen und Einheimischen. Die Leiche wurde zwischen den Löwenstatuen gefunden.'
                  }
                </p>
              </div>
              
              <div className="col-md-4">
                <div 
                  className="d-flex align-items-center justify-content-center rounded position-relative"
                  style={{ 
                    height: '200px',
                    backgroundColor: '#4a5568',
                    background: 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)'
                  }}
                >
                  <div className="text-center" style={{ color: '#a0aec0' }}>
                    <Mountain size={64} strokeWidth={1.5} />
                    <div className="mt-3 fw-medium">Crime Scene Image</div>
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
