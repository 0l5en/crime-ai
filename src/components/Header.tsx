
import { useKeycloak } from "@/contexts/KeycloakContext";
import { Link } from "react-router-dom";
import NotificationBadge from "./NotificationBadge";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const { authenticated, user, login, logout, hasRole } = useKeycloak();

  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top border-bottom bg-body">
        <div className="container-fluid px-4">
          {/* Brand */}
          <Link to="/" className="navbar-brand d-flex align-items-center text-decoration-none">
            <img src="/logo.svg" alt="logo" style={{ maxHeight: '35px' }} className="me-2" />
            <span className="fs-4 fw-semibold">DetectivesGame</span>
          </Link>

          {/* Desktop Navigation - visible on lg+ screens */}
          <div className="d-none d-lg-flex navbar-nav ms-auto align-items-center gap-3">
            {/* Theme Toggle */}
            <div className="nav-item">
              <ThemeToggle />
            </div>

            {authenticated ? (
              <>

                {/* Notification Badge */}
                <div className="nav-item">
                  <NotificationBadge />
                </div>

                {/* User Profile */}
                {user && (
                  <div className="nav-item d-flex align-items-center gap-2">
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

                {/* Admin Link */}
                {hasRole('admin') && (
                  <div className="nav-item">
                    <Link to="/admin" className="nav-link p-0">
                      <button className="btn btn-outline-primary bg-transparent border-danger text-danger">
                        Admin
                      </button>
                    </Link>
                  </div>
                )}

                {/* Vacation Rental Dashboard Link */}
                {hasRole('vacation-rental') && (
                  <div className="nav-item">
                    <Link to="/vacation-rental-dashboard" className="nav-link p-0">
                      <button className="btn btn-primary">
                        <i className="bi bi-house-door me-1"></i>
                        My Cases
                      </button>
                    </Link>
                  </div>
                )}

                {/* Logout Button */}
                <div className="nav-item">
                  <button
                    className="btn btn-outline-secondary"
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
                    className="btn btn-outline-secondary"
                    onClick={() => login()}
                  >
                    Sign In
                  </button>
                </div>

                {/* Sign Up Button */}
                <div className="nav-item">
                  <button className="btn btn-danger">
                    Sign Up
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Mobile Hamburger Button - visible only on smaller screens */}
          <button
            className="navbar-toggler border-0 d-lg-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileOffcanvas"
            aria-controls="mobileOffcanvas"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      {/* Mobile Offcanvas Menu - Fullscreen */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex={-1}
        id="mobileOffcanvas"
        aria-labelledby="mobileOffcanvasLabel"
        style={{
          width: '100vw',
          height: '100vh',
          maxWidth: '100vw'
        }}
      >
        {/* Offcanvas Header */}
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title d-flex align-items-center" id="mobileOffcanvasLabel">
            <div className="bg-light rounded d-flex align-items-center justify-content-center me-2" style={{ width: '24px', height: '24px' }}>
              <div className="bg-dark rounded" style={{ width: '12px', height: '12px' }}></div>
            </div>
            DetectivesGame
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        {/* Offcanvas Body */}
        <div className="offcanvas-body d-flex flex-column justify-content-between">
          <div>
            {/* Theme Toggle */}
            <div className="mb-4 d-flex align-items-center justify-content-between">
              <span>Theme</span>
              <ThemeToggle />
            </div>

            {/* User Section for authenticated users */}
            {authenticated && user && (
              <div className="mb-4 p-3 border rounded">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="bg-danger rounded-circle d-flex align-items-center justify-content-center text-white fw-semibold" style={{ width: '40px', height: '40px' }}>
                    {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="flex-grow-1">
                    <div className="fw-medium">{user.name || user.email}</div>
                    <div className="text-muted small">
                      {user.roles.join(', ') || 'No roles'}
                    </div>
                  </div>
                  {/* Notification Badge for Mobile */}
                  <NotificationBadge />
                </div>

                {/* Vacation Rental Dashboard Link - Mobile */}
                {hasRole('vacation-rental') && (
                  <Link
                    to="/vacation-rental-dashboard"
                    className="btn btn-outline-primary bg-transparent border-warning text-warning w-100 mb-2"
                    data-bs-dismiss="offcanvas"
                  >
                    <i className="bi bi-house-door me-2"></i>
                    My Cases
                  </Link>
                )}

                {/* Admin Link for mobile */}
                {hasRole('admin') && (
                  <Link
                    to="/admin"
                    className="btn btn-outline-primary bg-transparent border-danger text-danger w-100 mb-2"
                    data-bs-dismiss="offcanvas"
                  >
                    Admin Dashboard
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Bottom Action Buttons */}
          <div className="mt-auto">
            {authenticated ? (
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  logout();
                  // Close offcanvas after logout
                  const offcanvas = document.getElementById('mobileOffcanvas');
                  if (offcanvas) {
                    const bsOffcanvas = new (window as any).bootstrap.Offcanvas(offcanvas);
                    bsOffcanvas.hide();
                  }
                }}
              >
                Logout
              </button>
            ) : (
              <div className="d-grid gap-2">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    login();
                    // Close offcanvas after login attempt
                    const offcanvas = document.getElementById('mobileOffcanvas');
                    if (offcanvas) {
                      const bsOffcanvas = new (window as any).bootstrap.Offcanvas(offcanvas);
                      bsOffcanvas.hide();
                    }
                  }}
                >
                  Sign In
                </button>
                <button className="btn btn-danger">
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
