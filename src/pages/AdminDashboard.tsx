
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-vh-100 bg-dark">
      <Header />
      
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-light mb-4">
            Admin-Dashboard
          </h1>
          <p className="h5 text-muted">
            Verwaltungsbereich für Administratoren
          </p>
        </div>
        
        <div className="row g-4">
          <div className="col-md-6 col-lg-3">
            <div className="card bg-secondary border-secondary">
              <div className="card-body p-4">
                <h3 className="h5 fw-semibold text-light mb-2">
                  Benutzerverwaltung
                </h3>
                <p className="text-muted">
                  Verwalten Sie Benutzer und deren Rollen
                </p>
              </div>
            </div>
          </div>
          
          <div className="col-md-6 col-lg-3">
            <div className="card bg-secondary border-secondary">
              <div className="card-body p-4">
                <h3 className="h5 fw-semibold text-light mb-2">
                  Systemeinstellungen
                </h3>
                <p className="text-muted">
                  Konfigurieren Sie Systemparameter
                </p>
              </div>
            </div>
          </div>
          
          <div className="col-md-6 col-lg-3">
            <div className="card bg-secondary border-secondary">
              <div className="card-body p-4">
                <h3 className="h5 fw-semibold text-light mb-2">
                  Berichte
                </h3>
                <p className="text-muted">
                  Einsicht in Systemberichte und Analytics
                </p>
              </div>
            </div>
          </div>

          <div 
            className="col-md-6 col-lg-3"
            onClick={() => navigate('/admin/cases')}
          >
            <div className="card bg-secondary border-secondary card-hover" style={{ cursor: 'pointer' }}>
              <div className="card-body p-4">
                <h3 className="h5 fw-semibold text-light mb-2">
                  Kriminalfall-Verwaltung
                </h3>
                <p className="text-muted">
                  Verwalten Sie alle Kriminalfälle
                </p>
              </div>
            </div>
          </div>

          <div 
            className="col-md-6 col-lg-3"
            onClick={() => navigate('/admin/prompts')}
          >
            <div className="card bg-secondary border-secondary card-hover" style={{ cursor: 'pointer' }}>
              <div className="card-body p-4">
                <h3 className="h5 fw-semibold text-light mb-2">
                  Prompt-Templates
                </h3>
                <p className="text-muted">
                  Configure your Prompts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
