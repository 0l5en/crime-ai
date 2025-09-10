
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { useCrimeCases } from "@/hooks/useCrimeCases";
import { useUpdateCrimeCase } from "@/hooks/useUpdateCrimeCase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CrimeCaseDto } from "supabase/functions/_shared/crime-api-types";

const AdminCaseManagement = () => {
  const navigate = useNavigate();
  const { data: crimeCases, isLoading, error } = useCrimeCases();
  const updateCrimeCase = useUpdateCrimeCase();
  const { toast } = useToast();
  const [updatingCaseId, setUpdatingCaseId] = useState<string | null>(null);

  const handleStatusUpdate = async (crimeCase: CrimeCaseDto) => {
    try {
      setUpdatingCaseId(crimeCase.id);
      await updateCrimeCase.mutateAsync({
        caseId: crimeCase.id,
        updateData: crimeCase
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
                </tr>
              </thead>
              <tbody>
                {crimeCases.items.map((crimeCase) => (
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
                  </tr>
                ))}
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

export default AdminCaseManagement;
