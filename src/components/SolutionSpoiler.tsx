
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useSolutionSpoiler } from "@/hooks/useSolutionSpoiler";

interface SolutionSpoilerProps {
  caseId: string;
}

const SolutionSpoiler = ({ caseId }: SolutionSpoilerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { data: solutionSpoiler, isLoading, error } = useSolutionSpoiler(caseId);

  if (isLoading) {
    return (
      <div className="card border-0 text-light" style={{ backgroundColor: '#2a2a2a' }}>
        <div className="card-body p-4">
          <div className="text-center text-muted py-3">
            <p>Loading solution spoiler...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card border-0 text-light" style={{ backgroundColor: '#2a2a2a' }}>
        <div className="card-body p-4">
          <div className="text-center text-muted py-3">
            <p>Solution spoiler not available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card border-0 text-light" style={{ backgroundColor: '#2a2a2a' }}>
      <div className="card-body p-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h3 className="h4 text-white mb-0">Solution Spoiler</h3>
          <button
            className="btn btn-outline-warning btn-sm"
            onClick={() => setIsVisible(!isVisible)}
          >
            {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
            <span className="ms-2">{isVisible ? 'Hide' : 'Show'} Solution</span>
          </button>
        </div>

        {isVisible && solutionSpoiler ? (
          <div className="row g-3">
            <div className="col-md-4">
              <div 
                className="card h-100 border-0"
                style={{ backgroundColor: '#dc3545' }}
              >
                <div className="card-body">
                  <h5 className="card-title text-white mb-3">Key Evidence</h5>
                  <ul className="list-unstyled text-white">
                    {solutionSpoiler.evidenceTitles.map((evidence, index) => (
                      <li key={index} className="mb-2">
                        • {evidence}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div 
                className="card h-100 border-0"
                style={{ backgroundColor: '#ffc107' }}
              >
                <div className="card-body">
                  <h5 className="card-title text-dark mb-3">Motives</h5>
                  <ul className="list-unstyled text-dark">
                    {solutionSpoiler.motiveTitles.map((motive, index) => (
                      <li key={index} className="mb-2">
                        • {motive}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div 
                className="card h-100 border-0"
                style={{ backgroundColor: '#28a745' }}
              >
                <div className="card-body">
                  <h5 className="card-title text-white mb-3">Key Persons</h5>
                  <ul className="list-unstyled text-white">
                    {solutionSpoiler.personNames.map((person, index) => (
                      <li key={index} className="mb-2">
                        • {person}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : !isVisible ? (
          <div className="text-center text-muted py-4">
            <p className="mb-0">
              <strong>Warning:</strong> This will reveal the solution to the case. 
              Click "Show Solution" only if you want to see the spoiler.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SolutionSpoiler;
