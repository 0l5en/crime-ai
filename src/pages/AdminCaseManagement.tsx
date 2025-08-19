
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
          <Button 
            variant="success"
            onClick={() => navigate('/admin/case-generator')}
          >
            Neuen Fall generieren
          </Button>
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
            <Table>
              <TableHeader>
                <TableRow className="border-secondary">
                  <TableHead className="text-muted">ID</TableHead>
                  <TableHead className="text-muted">Titel</TableHead>
                  <TableHead className="text-muted">Beschreibung</TableHead>
                  <TableHead className="text-muted">Status</TableHead>
                  <TableHead className="text-muted">Aktionen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {crimeCases.items.map((crimeCase) => (
                  <TableRow key={crimeCase.id} className="border-secondary">
                    <TableCell className="text-light font-monospace small">
                      {crimeCase.id.substring(0, 8)}...
                    </TableCell>
                    <TableCell className="text-light fw-semibold">
                      {crimeCase.title}
                    </TableCell>
                    <TableCell className="text-muted" style={{ maxWidth: '300px' }}>
                      <div className="text-truncate">{crimeCase.description}</div>
                    </TableCell>
                    <TableCell>
                      <span className="badge bg-success">
                        Aktiv
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="d-flex gap-2">
                        <Button 
                          variant="info"
                          size="sm"
                          onClick={() => navigate(`/case/${crimeCase.id}`)}
                        >
                          Ansehen
                        </Button>
                        <Button 
                          variant="warning"
                          size="sm"
                        >
                          Bearbeiten
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
