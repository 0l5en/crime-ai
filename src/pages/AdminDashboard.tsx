
import Header from "@/components/Header";

const AdminDashboard = () => {
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
