
import CaseRowEditable from "@/components/CaseRowEditable";
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
          <div className="card bg-dark border-secondary shadow-lg">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-dark table-hover mb-0">
                  <thead className="border-bottom border-secondary">
                    <tr>
                      <th className="text-muted fw-semibold ps-4" style={{ width: '120px' }}>ID</th>
                      <th className="text-muted fw-semibold" style={{ width: '200px' }}>Titel</th>
                      <th className="text-muted fw-semibold" style={{ width: '300px' }}>Beschreibung</th>
                      <th className="text-muted fw-semibold text-center" style={{ width: '120px' }}>Status</th>
                      <th className="text-muted fw-semibold" style={{ width: '200px' }}>Aktionen</th>
                      <th className="text-muted fw-semibold text-center" style={{ width: '100px' }}>Lösung</th>
                      <th className="text-muted fw-semibold text-center pe-4" style={{ width: '100px' }}>Löschen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {crimeCases.items.map((crimeCase) => <CaseRowEditable crimeCase={crimeCase} key={crimeCase.id} />)}
                  </tbody>
                </table>
              </div>
            </div>
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
