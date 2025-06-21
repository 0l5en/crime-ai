
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCrimeCases } from "@/hooks/useCrimeCases";
import { useNavigate } from "react-router-dom";

const AdminCaseManagement = () => {
  const navigate = useNavigate();
  const { data: crimeCases, isLoading, error } = useCrimeCases();

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      
      <div className="max-w-7xl mx-auto py-12 px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Kriminalfall-Verwaltung
            </h1>
            <p className="text-xl text-gray-300">
              Übersicht aller verfügbaren Kriminalfälle
            </p>
          </div>
          <Button 
            variant="outline" 
            className="bg-transparent border-white text-white hover:bg-white hover:text-slate-900"
            onClick={() => navigate('/admin')}
          >
            Zurück zum Dashboard
          </Button>
        </div>

        {isLoading && (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <div className="text-white text-xl">Lade Kriminalfälle...</div>
          </div>
        )}

        {error && (
          <div className="text-center py-16">
            <div className="text-red-400 text-xl mb-4">
              Fehler beim Laden der Kriminalfälle
            </div>
            <div className="text-gray-400">
              {error.message}
            </div>
          </div>
        )}

        {!isLoading && !error && (!crimeCases?.items || crimeCases.items.length === 0) && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-xl">
              Keine Kriminalfälle verfügbar
            </div>
          </div>
        )}

        {!isLoading && !error && crimeCases?.items && crimeCases.items.length > 0 && (
          <div className="bg-slate-800 rounded-lg border border-slate-700">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-gray-300">ID</TableHead>
                  <TableHead className="text-gray-300">Titel</TableHead>
                  <TableHead className="text-gray-300">Beschreibung</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Aktionen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {crimeCases.items.map((crimeCase) => (
                  <TableRow key={crimeCase.id} className="border-slate-700 hover:bg-slate-750">
                    <TableCell className="text-white font-mono text-sm">
                      {crimeCase.id.substring(0, 8)}...
                    </TableCell>
                    <TableCell className="text-white font-semibold">
                      {crimeCase.title}
                    </TableCell>
                    <TableCell className="text-gray-300 max-w-md truncate">
                      {crimeCase.description}
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-green-600 text-white text-xs rounded-full">
                        Aktiv
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="bg-transparent border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                          onClick={() => navigate(`/case/${crimeCase.id}`)}
                        >
                          Ansehen
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="bg-transparent border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
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
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Insgesamt {crimeCases.items.length} Kriminalfälle gefunden
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCaseManagement;
