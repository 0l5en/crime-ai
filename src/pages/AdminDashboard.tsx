
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      
      <div className="max-w-7xl mx-auto py-12 px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Admin-Dashboard
          </h1>
          <p className="text-xl text-gray-300">
            Verwaltungsbereich für Administratoren
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-2">
              Benutzerverwaltung
            </h3>
            <p className="text-gray-300">
              Verwalten Sie Benutzer und deren Rollen
            </p>
          </div>
          
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-2">
              Systemeinstellungen
            </h3>
            <p className="text-gray-300">
              Konfigurieren Sie Systemparameter
            </p>
          </div>
          
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-2">
              Berichte
            </h3>
            <p className="text-gray-300">
              Einsicht in Systemberichte und Analytics
            </p>
          </div>

          <div 
            className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:bg-slate-700 transition-colors cursor-pointer"
            onClick={() => navigate('/admin/cases')}
          >
            <h3 className="text-lg font-semibold text-white mb-2">
              Kriminalfall-Verwaltung
            </h3>
            <p className="text-gray-300">
              Verwalten Sie alle Kriminalfälle
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
