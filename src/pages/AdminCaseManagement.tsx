
import Header from "@/components/Header";
import { useCrimeCases } from "@/hooks/useCrimeCases";
import { useNavigate } from "react-router-dom";

const AdminCaseManagement = () => {
  const navigate = useNavigate();
  const { data: crimeCases, isLoading, error } = useCrimeCases();

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
                      <span className="badge bg-success">
                        Aktiv
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
