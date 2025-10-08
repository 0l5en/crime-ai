import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-vh-100" style={{ backgroundColor: "var(--bs-body-bg)" }}>
      <Header />

      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-4">Admin Dashboard</h1>
          <p className="h5 text-muted">Administrative area for administrators</p>
        </div>

        <div className="row g-4">
          <div className="col-md-6 col-lg-3">
            <div className="card">
              <div className="card-body p-4">
                <h3 className="h5 fw-semibold mb-2">User Management</h3>
                <p className="text-muted">Manage users and roles</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card">
              <div className="card-body p-4">
                <h3 className="h5 fw-semibold mb-2">Account Management</h3>
                <p className="text-muted">Manage your account</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card">
              <div className="card-body p-4">
                <h3 className="h5 fw-semibold mb-2">Analytics</h3>
                <p className="text-muted">System reports and analytics</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3" onClick={() => navigate("/admin/cases")}>
            <div className="card card-hover" style={{ cursor: "pointer" }}>
              <div className="card-body p-4">
                <h3 className="h5 fw-semibold mb-2">Case Management</h3>
                <p className="text-muted">Manage all criminal cases</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3" onClick={() => navigate("/admin/prompts")}>
            <div className="card card-hover" style={{ cursor: "pointer" }}>
              <div className="card-body p-4">
                <h3 className="h5 fw-semibold mb-2">Prompt Templates</h3>
                <p className="text-muted">Configure your prompts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
