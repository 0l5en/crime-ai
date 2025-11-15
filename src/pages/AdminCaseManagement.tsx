
import CaseRowEditable from "@/components/CaseRowEditable";
import Header from "@/components/Header";
import { useCrimeCaseGeneratorInfo } from "@/hooks/useCrimeCaseGeneratorInfo";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type CrimeCaseGeneratorInfoFilterDto = { firstResult: number; maxResults: number };

const AdminCaseManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [crimeCaseGeneratorInfoFilter, setCrimeCaseGeneratorInfoFilter] = useState<CrimeCaseGeneratorInfoFilterDto>({ firstResult: 0, maxResults: 10 });
  const { data: crimeCaseGeneratorInfos, isPending: crimeCaseGeneratorInfosPending, isError: crimeCaseGeneratorInfosIsError, error: crimeCaseGeneratorInfosError } = useCrimeCaseGeneratorInfo(crimeCaseGeneratorInfoFilter);
  const pagesTotal = crimeCaseGeneratorInfos?.total ? Math.ceil(crimeCaseGeneratorInfos.total / crimeCaseGeneratorInfoFilter.maxResults) : 1;
  const pageCurrent = crimeCaseGeneratorInfos?.total ? crimeCaseGeneratorInfoFilter.firstResult / crimeCaseGeneratorInfoFilter.maxResults + 1 : 1;
  const hasPreviousPage = crimeCaseGeneratorInfoFilter.firstResult > 0;
  const hasNextPage = crimeCaseGeneratorInfos?.total ? crimeCaseGeneratorInfoFilter.firstResult + crimeCaseGeneratorInfoFilter.maxResults < crimeCaseGeneratorInfos.total : false;

  const previousPage = () => {
    if (hasPreviousPage) {
      setCrimeCaseGeneratorInfoFilter({ ...crimeCaseGeneratorInfoFilter, firstResult: crimeCaseGeneratorInfoFilter.firstResult - crimeCaseGeneratorInfoFilter.maxResults });
    }
  }

  const nextPage = () => {
    if (hasNextPage) {
      setCrimeCaseGeneratorInfoFilter({ ...crimeCaseGeneratorInfoFilter, firstResult: crimeCaseGeneratorInfoFilter.firstResult + crimeCaseGeneratorInfoFilter.maxResults });
    }
  }

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
            <div className="d-flex justify-content-center align-items-center">
              <button className="me-4 btn btn-secondary btn-sm" disabled={!hasPreviousPage} onClick={previousPage}><ChevronLeft /></button>
              <div className="text-muted">
                Seite {pageCurrent} von {pagesTotal} {pagesTotal === 1 ? 'Seite' : 'Seiten'}
                {searchTerm && ` (gefiltert von ${crimeCaseGeneratorInfos.items.length || 0} gesamt)`}
              </div>
              <button className="ms-4 btn btn-secondary btn-sm" disabled={!hasNextPage} onClick={nextPage}><ChevronRight /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};



export default AdminCaseManagement;
