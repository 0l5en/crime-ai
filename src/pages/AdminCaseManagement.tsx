
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { useCrimeCases } from "@/hooks/useCrimeCases";
import { useUpdateCrimeCase } from "@/hooks/useUpdateCrimeCase";
import { useSolutionSpoiler } from "@/hooks/useSolutionSpoiler";
import type { components } from '@/openapi/crimeAiSchema';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

type CrimeCaseDto = components['schemas']['CrimeCaseDto'];

const AdminCaseManagement = () => {
  const navigate = useNavigate();
  const { data: crimeCases, isLoading, error } = useCrimeCases();
  const updateCrimeCase = useUpdateCrimeCase();
  const { toast } = useToast();
  const [updatingCaseId, setUpdatingCaseId] = useState<string | null>(null);
  const [expandedCaseIds, setExpandedCaseIds] = useState<Set<string>>(new Set());

  const handleStatusUpdate = async (crimeCaseDto: CrimeCaseDto) => {
    try {
      setUpdatingCaseId(crimeCaseDto.id);
      await updateCrimeCase.mutateAsync({
        caseId: crimeCaseDto.id,
        crimeCaseDto
      });
      toast({
        title: "Status aktualisiert",
        description: `Der Status wurde erfolgreich geändert.`,
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Der Status konnte nicht aktualisiert werden.",
      });
    } finally {
      setUpdatingCaseId(null);
    }
  };

  const toggleSolution = (caseId: string) => {
    setExpandedCaseIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(caseId)) {
        newSet.delete(caseId);
      } else {
        newSet.add(caseId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-vh-100 bg-dark">
      <Header />

      <div className="container py-5">
        <div className="d-flex align-items-center justify-content-between mb-5">
          <div>
            <h1 className="display-4 fw-bold text-light mb-4">
              Kriminalfall-Verwaltung
            </h1>
            <p className="h5 text-muted">
              Übersicht aller verfügbaren Kriminalfälle
            </p>
          </div>
          <button
            className="btn btn-success"
            onClick={() => navigate('/admin/case-generator')}
          >
            Neuen Fall generieren
          </button>
        </div>

        {isLoading && (
          <div className="text-center py-5">
            <div className="spinner-border text-light mb-4" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="text-light h5">Lade Kriminalfälle...</div>
          </div>
        )}

        {error && (
          <div className="text-center py-5">
            <div className="text-danger h5 mb-4">
              Fehler beim Laden der Kriminalfälle
            </div>
            <div className="text-muted">
              {error.message}
            </div>
          </div>
        )}

        {!isLoading && !error && (!crimeCases?.items || crimeCases.items.length === 0) && (
          <div className="text-center py-5">
            <div className="text-muted h5">
              Keine Kriminalfälle verfügbar
            </div>
          </div>
        )}

        {!isLoading && !error && crimeCases?.items && crimeCases.items.length > 0 && (
          <div className="card bg-secondary border-secondary">
            <table className="table table-dark table-striped">
              <thead>
                <tr className="border-secondary">
                  <th className="text-muted">ID</th>
                  <th className="text-muted">Titel</th>
                  <th className="text-muted">Beschreibung</th>
                  <th className="text-muted">Status</th>
                  <th className="text-muted">Aktionen</th>
                  <th className="text-muted">Lösung</th>
                </tr>
              </thead>
              <tbody>
                {crimeCases.items.map((crimeCase) => {
                  const isExpanded = expandedCaseIds.has(crimeCase.id);
                  return (
                    <>
                      <tr key={crimeCase.id} className="border-secondary">
                        <td className="text-light font-monospace small">
                          {crimeCase.id.substring(0, 8)}...
                        </td>
                        <td className="text-light fw-semibold">
                          {crimeCase.title}
                        </td>
                        <td className="text-muted" style={{ maxWidth: '300px' }}>
                          <div className="text-truncate">{crimeCase.description}</div>
                        </td>
                        <td>
                          <span className={`badge ${crimeCase.status === 'PUBLISHED' ? 'bg-success' :
                            crimeCase.status === 'PREMIUM' ? 'bg-warning text-dark' :
                              'bg-secondary'
                            }`}>
                            {crimeCase.status === 'PUBLISHED' ? 'Veröffentlicht' :
                              crimeCase.status === 'PREMIUM' ? 'Premium' :
                                'Unveröffentlicht'}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-info btn-sm"
                              onClick={() => navigate(`/case/${crimeCase.id}`)}
                            >
                              Ansehen
                            </button>
                            <button className="btn btn-warning btn-sm">
                              Bearbeiten
                            </button>
                            <div className="dropdown">
                              <button
                                className="btn btn-secondary btn-sm dropdown-toggle"
                                data-bs-toggle="dropdown"
                                disabled={updatingCaseId === crimeCase.id}
                                style={{ zIndex: 1000 }}
                              >
                                {updatingCaseId === crimeCase.id ? (
                                  <span className="spinner-border spinner-border-sm me-2" />
                                ) : null}
                                Status ändern
                              </button>
                              <ul
                                className="dropdown-menu dropdown-menu-dark bg-secondary border border-secondary"
                                style={{ zIndex: 1050 }}
                              >
                                <li>
                                  <button
                                    className="dropdown-item"
                                    onClick={() => handleStatusUpdate({ ...crimeCase, status: 'UNPUBLISHED' })}
                                    disabled={crimeCase.status === 'UNPUBLISHED'}
                                  >
                                    Unveröffentlicht
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="dropdown-item"
                                    onClick={() => handleStatusUpdate({ ...crimeCase, status: 'PUBLISHED' })}
                                    disabled={crimeCase.status === 'PUBLISHED'}
                                  >
                                    Veröffentlicht
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="dropdown-item"
                                    onClick={() => handleStatusUpdate({ ...crimeCase, status: 'PREMIUM' })}
                                    disabled={crimeCase.status === 'PREMIUM'}
                                  >
                                    Premium
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-info"
                            onClick={() => toggleSolution(crimeCase.id)}
                          >
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            {isExpanded ? ' Verbergen' : ' Anzeigen'}
                          </button>
                        </td>
                      </tr>
                      {isExpanded && (
                        <SolutionRow caseId={crimeCase.id} />
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {!isLoading && !error && crimeCases?.items && crimeCases.items.length > 0 && (
          <div className="mt-4 text-center">
            <p className="text-muted">
              Insgesamt {crimeCases.items.length} Kriminalfälle gefunden
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const SolutionRow = ({ caseId }: { caseId: string }) => {
  const { data: solution, isLoading, error } = useSolutionSpoiler(caseId);

  return (
    <tr>
      <td colSpan={6} className="bg-dark border-secondary">
        <div className="p-4">
          {isLoading && (
            <div className="d-flex align-items-center gap-2 text-muted">
              <span className="spinner-border spinner-border-sm" />
              Lade Lösung...
            </div>
          )}
          
          {error && (
            <div className="text-warning">
              <strong>⚠️ Lösung nicht verfügbar</strong>
              <p className="mb-0 small mt-1">
                {error.message.includes('404') 
                  ? 'Für diesen Fall wurde noch keine Lösung generiert.' 
                  : 'Fehler beim Laden der Lösung.'}
              </p>
            </div>
          )}
          
          {solution && !isLoading && (
            <div className="row g-3">
              {/* Täter */}
              {solution.personNames && solution.personNames.length > 0 && (
                <div className="col-md-4">
                  <div className="card bg-danger bg-opacity-10 border-danger">
                    <div className="card-body">
                      <h6 className="text-danger mb-3">
                        <strong>🔴 Täter</strong>
                      </h6>
                      <div className="d-flex flex-wrap gap-2">
                        {solution.personNames.map((name, idx) => (
                          <span key={idx} className="badge bg-danger">
                            {name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Beweise */}
              {solution.evidenceTitles && solution.evidenceTitles.length > 0 && (
                <div className="col-md-4">
                  <div className="card bg-warning bg-opacity-10 border-warning">
                    <div className="card-body">
                      <h6 className="text-warning mb-3">
                        <strong>🔍 Überführende Beweise</strong>
                      </h6>
                      <ul className="list-unstyled mb-0">
                        {solution.evidenceTitles.map((title, idx) => (
                          <li key={idx} className="text-light small mb-1">
                            • {title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Motive */}
              {solution.motiveTitles && solution.motiveTitles.length > 0 && (
                <div className="col-md-4">
                  <div className="card bg-info bg-opacity-10 border-info">
                    <div className="card-body">
                      <h6 className="text-info mb-3">
                        <strong>💡 Motive</strong>
                      </h6>
                      <ul className="list-unstyled mb-0">
                        {solution.motiveTitles.map((title, idx) => (
                          <li key={idx} className="text-light small mb-1">
                            • {title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default AdminCaseManagement;
