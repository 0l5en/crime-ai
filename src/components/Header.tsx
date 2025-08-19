
import { Link } from "react-router-dom";
import { useKeycloak } from "@/contexts/KeycloakContext";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const { authenticated, user, login, logout, hasRole } = useKeycloak();

  return (
    <header className="sticky-top bg-dark text-light px-4 py-3 border-bottom border-secondary">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <Link to="/" className="d-flex align-items-center text-decoration-none text-light opacity-hover">
          <div className="bg-light rounded d-flex align-items-center justify-content-center me-2" style={{ width: '32px', height: '32px' }}>
            <div className="bg-dark rounded" style={{ width: '16px', height: '16px' }}></div>
          </div>
          <span className="fs-4 fw-semibold">Mystery Solvers</span>
        </Link>
        
        <div className="d-flex align-items-center gap-3">
          <ThemeToggle />
          
          {authenticated ? (
            <>
              {hasRole('admin') && (
                <Link to="/admin">
                  <button className="btn btn-outline-primary bg-transparent border-danger text-danger">
                    Admin
                  </button>
                </Link>
              )}
              
              {user && (
                <div className="d-flex align-items-center gap-2">
                  <div className="text-end">
                    <div className="small fw-medium">{user.name || user.email}</div>
                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                      {user.roles.join(', ') || 'No roles'}
                    </div>
                  </div>
                  <div className="bg-danger rounded-circle d-flex align-items-center justify-content-center text-white fw-semibold" style={{ width: '32px', height: '32px', fontSize: '0.875rem' }}>
                    {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                </div>
              )}
              <button 
                className="btn btn-outline-secondary bg-transparent border-light text-light"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button 
                className="btn btn-outline-secondary bg-transparent border-light text-light"
                onClick={() => login()}
              >
                Sign In
              </button>
              <button className="btn btn-danger">
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
