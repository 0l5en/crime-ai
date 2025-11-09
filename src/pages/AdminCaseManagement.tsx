
import CaseRowEditable from "@/components/CaseRowEditable";
import Header from "@/components/Header";
import { useCrimeCases } from "@/hooks/useCrimeCases";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminCaseManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [displayLimit, setDisplayLimit] = useState(10);
  const { data: crimeCases, isLoading, error } = useCrimeCases({ maxResults: '1000' });

  // Filter cases based on search term
  const filteredCases = useMemo(() => {
    if (!crimeCases?.items) return [];
    if (!searchTerm.trim()) return crimeCases.items;

    const lowerSearch = searchTerm.toLowerCase();
    return crimeCases.items.filter(crimeCase =>
      crimeCase.title?.toLowerCase().includes(lowerSearch) ||
      crimeCase.description?.toLowerCase().includes(lowerSearch) ||
      crimeCase.id?.toLowerCase().includes(lowerSearch)
    );
  }, [crimeCases?.items, searchTerm]);

  // Get cases to display based on current limit
  const displayedCases = filteredCases.slice(0, displayLimit);
  const hasMore = displayLimit < filteredCases.length;

  return (
    <div className="min-vh-100">
      <Header />

      <div className="container-fluid py-5">
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

        {/* Search Bar */}
        <div className="mb-4">
          <div className="input-group input-group-lg">
            <span className="input-group-text bg-dark border-secondary text-muted">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control bg-dark border-secondary text-light"
              placeholder="Suche nach Titel, Beschreibung oder ID..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setDisplayLimit(10); // Reset limit when searching
              }}
            />
            {searchTerm && (
              <button
                className="btn btn-outline-secondary"
                onClick={() => {
                  setSearchTerm("");
                  setDisplayLimit(10);
                }}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            )}
          </div>
          {searchTerm && (
            <div className="text-muted mt-2">
              {filteredCases.length} {filteredCases.length === 1 ? 'Fall' : 'Fälle'} gefunden
            </div>
          )}
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

        {!isLoading && !error && filteredCases.length === 0 && searchTerm && (
          <div className="text-center py-5">
            <div className="text-muted h5">
              Keine Fälle gefunden für "{searchTerm}"
            </div>
          </div>
        )}

        {!isLoading && !error && displayedCases.length > 0 && (
          <div className="card bg-dark border-secondary shadow-lg">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-dark table-hover mb-0">
                  <thead className="border-bottom border-secondary">
                    <tr>
                      <th className="text-muted fw-semibold ps-4">ID</th>
                      <th className="text-muted fw-semibold">Titel</th>
                      <th className="text-muted fw-semibold">Beschreibung</th>
                      <th className="text-muted fw-semibold">Typ</th>
                      <th className="text-muted fw-semibold">Status</th>
                      <th className="text-muted fw-semibold">Aktionen</th>
                      <th className="text-muted fw-semibold text-center">Lösung</th>
                      <th className="text-muted fw-semibold text-center pe-4">Löschen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedCases.map((crimeCase) => <CaseRowEditable crimeCase={crimeCase} key={crimeCase.id} />)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {!isLoading && !error && displayedCases.length > 0 && (
          <div className="mt-4">
            <div className="text-center">
              <p className="text-muted">
                Zeige {displayedCases.length} von {filteredCases.length} {filteredCases.length === 1 ? 'Fall' : 'Fällen'}
                {searchTerm && ` (gefiltert von ${crimeCases?.items?.length || 0} gesamt)`}
              </p>
            </div>

            {hasMore && (
              <div className="text-center mt-3">
                <button
                  className="btn btn-outline-light btn-lg"
                  onClick={() => setDisplayLimit(prev => prev + 10)}
                >
                  Mehr Fälle laden
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};



export default AdminCaseManagement;
