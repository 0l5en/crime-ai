
import CaseRowEditable from "@/components/CaseRowEditable";
import Header from "@/components/Header";
import { useCrimeCaseGeneratorInfos } from "@/hooks/useCrimeCaseGeneratorInfos";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminCaseManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  //const { data: crimeCases, isLoading, error } = useCrimeCases({ maxResults: '1000' });
  const { data: crimeCaseGeneratorInfos, isPending: crimeCaseGeneratorInfosPending, isError: crimeCaseGeneratorInfosIsError, error: crimeCaseGeneratorInfosError } = useCrimeCaseGeneratorInfos({});

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

        {/* Search Bar 
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
        </div>*/}

        {crimeCaseGeneratorInfosPending && (
          <div className="text-center py-5">
            <div className="spinner-border text-light mb-4" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="text-light h5">Lade Kriminalfälle...</div>
          </div>
        )}

        {crimeCaseGeneratorInfosError && (
          <div className="text-center py-5">
            <div className="text-danger h5 mb-4">
              Fehler beim Laden der Kriminalfälle
            </div>
            <div className="text-muted">
              {crimeCaseGeneratorInfosError.message}
            </div>
          </div>
        )}

        {!crimeCaseGeneratorInfosPending && !crimeCaseGeneratorInfosIsError && crimeCaseGeneratorInfos.items && crimeCaseGeneratorInfos.items.length === 0 && (
          <div className="text-center py-5">
            <div className="text-muted h5">
              Keine Kriminalfälle verfügbar
            </div>
          </div>
        )}

        {!crimeCaseGeneratorInfosPending && !crimeCaseGeneratorInfosIsError && crimeCaseGeneratorInfos.items && crimeCaseGeneratorInfos.items.length === 0 && searchTerm && (
          <div className="text-center py-5">
            <div className="text-muted h5">
              Keine Fälle gefunden für "{searchTerm}"
            </div>
          </div>
        )}

        {!crimeCaseGeneratorInfosPending && !crimeCaseGeneratorInfosIsError && crimeCaseGeneratorInfos.items && crimeCaseGeneratorInfos.items.length > 0 && (
          <div className="card bg-dark border-secondary shadow-lg">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-dark table-hover mb-0">
                  <thead className="border-bottom border-secondary">
                    <tr>
                      <th className="text-muted fw-semibold">ID</th>
                      <th className="text-muted fw-semibold">erstellt am</th>
                      <th className="text-muted fw-semibold">Ersteller</th>
                      <th className="text-muted fw-semibold">Typ</th>
                      <th className="text-muted fw-semibold">Abonnement</th>
                      <th className="text-muted fw-semibold">Anzahl Versuche <br /> Fallgenerierung</th>
                      <th className="text-muted fw-semibold">Titel</th>
                      <th className="text-muted fw-semibold">Status</th>
                      <th className="text-muted fw-semibold">Aktionen</th>
                      <th className="text-muted fw-semibold text-center">Lösung</th>
                      <th className="text-muted fw-semibold text-center pe-4">Löschen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {crimeCaseGeneratorInfos.items.map((crimeCaseGeneratorInfoDto) => <CaseRowEditable crimeCaseGeneratorInfo={crimeCaseGeneratorInfoDto} key={crimeCaseGeneratorInfoDto.id} />)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {!crimeCaseGeneratorInfosPending && !crimeCaseGeneratorInfosIsError && crimeCaseGeneratorInfos.items && crimeCaseGeneratorInfos.items.length > 0 && (
          <div className="mt-4">
            <div className="text-center">
              <p className="text-muted">
                Zeige {crimeCaseGeneratorInfos.items.length} von {crimeCaseGeneratorInfos.items.length} {crimeCaseGeneratorInfos.items.length === 1 ? 'Fall' : 'Fällen'}
                {searchTerm && ` (gefiltert von ${crimeCaseGeneratorInfos.items.length || 0} gesamt)`}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};



export default AdminCaseManagement;
