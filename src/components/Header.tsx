
import { Link } from "react-router-dom";
import { useKeycloak } from "@/contexts/KeycloakContext";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const { authenticated, user, login, logout, hasRole } = useKeycloak();

  return (
    <nav className="navbar navbar-dark navbar-expand-lg sticky-top border-bottom border-secondary" style={{ backgroundColor: '#1a1a1a' }}>
      <div className="container-fluid px-4">
        {/* Brand */}
        <Link to="/" className="navbar-brand d-flex align-items-center text-decoration-none">
          <div className="bg-light rounded d-flex align-items-center justify-content-center me-2" style={{ width: '32px', height: '32px' }}>
            <div className="bg-dark rounded" style={{ width: '16px', height: '16px' }}></div>
          </div>
          <span className="fs-4 fw-semibold">Mystery Solvers</span>
        </Link>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ms-auto d-flex align-items-lg-center gap-lg-3">
            
            {/* Theme Toggle */}
            <div className="nav-item">
              <ThemeToggle />
            </div>

            {authenticated ? (
              <>
                {/* Admin Link */}
                {hasRole('admin') && (
                  <div className="nav-item">
                    <Link to="/admin" className="nav-link p-0">
                      <button className="btn btn-outline-primary bg-transparent border-danger text-danger w-100">
                        Admin
                      </button>
                    </Link>
                  </div>
                )}
                
                {/* User Profile */}
                {user && (
                  <div className="nav-item d-flex align-items-center gap-2 py-2 py-lg-0">
                    <div className="text-end">
                      <div className="small fw-medium text-white">{user.name || user.email}</div>
                      <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                        {user.roles.join(', ') || 'No roles'}
                      </div>
                    </div>
                    <div className="bg-danger rounded-circle d-flex align-items-center justify-content-center text-white fw-semibold" style={{ width: '32px', height: '32px', fontSize: '0.875rem' }}>
                      {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  </div>
                )}

                {/* Logout Button */}
                <div className="nav-item">
                  <button 
                    className="btn btn-outline-secondary bg-transparent border-light text-light w-100"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Sign In Button */}
                <div className="nav-item">
                  <button 
                    className="btn btn-outline-secondary bg-transparent border-light text-light w-100"
                    onClick={() => login()}
                  >
                    Sign In
                  </button>
                </div>

                {/* Sign Up Button */}
                <div className="nav-item">
                  <button className="btn btn-danger w-100">
                    Sign Up
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
