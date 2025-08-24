
import { Mountain } from "lucide-react";
import { usePersons } from "@/hooks/usePersons";
import InterrogationView from "./InterrogationView";
import type { components } from '@/openapi/crimeAiSchema';

type PersonDto = components['schemas']['PersonDto'];

interface CaseOverviewProps {
  caseId: string;
  crimeCase?: any;
  crimeScene?: any;
  sceneLoading: boolean;
}

const CaseOverview = ({ caseId, crimeCase, crimeScene, sceneLoading }: CaseOverviewProps) => {
  const { data: criminalAssistants, isLoading: assistantLoading } = usePersons(caseId, 'CRIMINAL_ASSISTANT');
  
  // Get the first criminal assistant (assuming there's only one)
  const criminalAssistant: PersonDto | null = criminalAssistants?.items && criminalAssistants.items.length > 0 
    ? criminalAssistants.items[0] 
    : null;

  // Generate initials from person name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

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

      {/* Criminal Assistant Section */}
      <div className="col-12">
        <div 
          className="card border-0 text-light"
          style={{ backgroundColor: '#2a2a2a' }}
        >
          <div className="card-body p-4">
            <h3 className="h4 text-white mb-3">Criminal Assistant</h3>
            
            {assistantLoading ? (
              <div className="text-center text-muted py-3">
                <p>Loading criminal assistant...</p>
              </div>
            ) : criminalAssistant ? (
              <div className="row">
                <div className="col-md-8">
                  <h4 className="h5 text-white mb-3">
                    {criminalAssistant.name}
                  </h4>
                  <p className="text-muted mb-3">
                    {criminalAssistant.profession} • {criminalAssistant.age} years old
                  </p>
                  
                  {/* Embedded InterrogationView */}
                  <InterrogationView 
                    person={criminalAssistant} 
                    embedded={true}
                  />
                </div>
                
                <div className="col-md-4">
                  <div 
                    className="d-flex align-items-center justify-content-center rounded position-relative"
                    style={{ 
                      height: '200px',
                      backgroundColor: '#28a745',
                      background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'
                    }}
                  >
                    <div className="text-center text-white">
                      <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold mx-auto mb-3" 
                           style={{ width: '80px', height: '80px', backgroundColor: 'rgba(255,255,255,0.2)' }}>
                        <span style={{ fontSize: '24px' }}>
                          {getInitials(criminalAssistant.name)}
                        </span>
                      </div>
                      <div className="fw-medium">Criminal Assistant</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted py-3">
                <p>No criminal assistant assigned to this case</p>
              </div>
            )}
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
