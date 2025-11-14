import { useUserContext } from "@/contexts/UserContext";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import LogoutButton from "./LogoutButton";
import NotificationBadge from "./NotificationBadge";
import SignInButton from "./SignInButton";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const user = useUserContext();
  const { t } = useTranslation('common');
  const location = useLocation();

  // Helper function to close the mobile offcanvas menu
  const closeOffcanvas = () => {
    const offcanvas = document.getElementById('mobileOffcanvas');
    if (offcanvas) {
      const bsOffcanvas = (window as any).bootstrap?.Offcanvas?.getInstance(offcanvas);
      if (bsOffcanvas) {
        bsOffcanvas.hide();
      }
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top bg-body">
        <div className="container-fluid px-4">
          {/* Brand */}
          <Link to="/" className="navbar-brand d-flex align-items-center text-decoration-none">
            <img src="/logo.svg" alt="logo" style={{ maxHeight: '35px' }} className="me-2" />
            <span className="fs-4 fw-semibold">DetectivesGame</span>
          </Link>

          {/* Desktop Navigation - visible on lg+ screens */}
          <div className="d-none d-lg-flex navbar-nav ms-auto align-items-center gap-3">
            {/* Language Selector */}
            <div className="nav-item">
              <LanguageSelector variant="desktop" />
            </div>

            {/* Theme Toggle */}
            <div className="nav-item">
              <ThemeToggle />
            </div>

            {user.isAuthenticated ? (
              <>

                {/* Notification Badge */}
                <div className="nav-item">
                  <NotificationBadge />
                </div>

                {/* User Profile */}
                {user && (
                  <Link to="/profile" className="nav-item text-decoration-none" style={{ cursor: 'pointer' }}>
                    <div className="bg-danger rounded-circle d-flex align-items-center justify-content-center text-white fw-semibold" style={{ width: '32px', height: '32px', fontSize: '0.875rem' }}>
                      {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  </Link>
                )}

                {/* Admin Link */}
                {user.hasAnyRole('admin') && (
                  <div className="nav-item">
                    <Link to="/admin" className="nav-link p-0">
                      <button className="btn btn-outline-primary bg-transparent border-danger text-danger">
                        {t('nav.admin')}
                      </button>
                    </Link>
                  </div>
                )}

                {/* Vacation Rental Dashboard Link */}
                {user.hasAnyRole('vacation-rental') && (
                  <div className="nav-item">
                    <Link to="/vacation-rental-dashboard" className="nav-link p-0">
                      <button className="btn btn-primary">
                        <i className="bi bi-house-door me-1"></i>
                        {t('nav.myCases')}
                      </button>
                    </Link>
                  </div>
                )}

                {/* Logout Button */}
                <div className="nav-item">
                  <LogoutButton />
                </div>
              </>
            ) : (
              <>
                {/* Sign In Button */}
                {location.pathname !== '/register' &&
                  <div className="nav-item">
                    <SignInButton />
                  </div>
                }

                {/* Sign Up Button */}
                {location.pathname !== '/register' && location.pathname !== '/venue-register' &&
                  <div className="nav-item">
                    <Link to={location.pathname === '/venues' ? '/venue-register' : '/register'} className="text-decoration-none">
                      <button className="btn btn-danger">
                        {t('nav.signUp')}
                      </button>
                    </Link>
                  </div>
                }
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
        <div className="offcanvas-body d-flex flex-column" style={{ paddingBottom: '2rem' }}>
          {/* Language Selector */}
          <div className="mb-4">
            <LanguageSelector variant="mobile" />
          </div>

          {/* Theme Toggle */}
          <div className="mb-4 d-flex align-items-center justify-content-between">
            <span>Theme</span>
            <ThemeToggle />
          </div>

          {/* User Section for authenticated users */}
          {user.isAuthenticated && (
            <div className="mb-4 p-3 border rounded">
              <Link to="/profile" className="text-decoration-none" onClick={closeOffcanvas}>
                <div className="d-flex align-items-center gap-3 mb-3" style={{ cursor: 'pointer' }}>
                  <div className="bg-danger rounded-circle d-flex align-items-center justify-content-center text-white fw-semibold" style={{ width: '40px', height: '40px' }}>
                    {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  {/* Notification Badge for Mobile */}
                  <NotificationBadge />
                </div>
              </Link>

              {/* View Profile Button */}
              <Link
                to="/profile"
                className="btn btn-outline-danger w-100 mb-2 text-decoration-none"
                onClick={closeOffcanvas}
              >
                View Profile
              </Link>

              {/* Vacation Rental Dashboard Link - Mobile */}
              {user.hasAnyRole('vacation-rental') && (
                <Link
                  to="/vacation-rental-dashboard"
                  className="btn btn-outline-primary bg-transparent border-warning text-warning w-100 mb-2 text-decoration-none"
                  onClick={closeOffcanvas}
                >
                  <i className="bi bi-house-door me-2"></i>
                  {t('nav.myCases')}
                </Link>
              )}

              {/* Admin Link for mobile */}
              {user.hasAnyRole('admin') && (
                <Link
                  to="/admin"
                  className="btn btn-outline-primary bg-transparent border-danger text-danger w-100 mb-2 text-decoration-none"
                  onClick={closeOffcanvas}
                >
                  {t('nav.admin')}
                </Link>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-4">
            {user.isAuthenticated ? (
              <LogoutButton onLogout={closeOffcanvas} />
            ) : (
              <div className="d-grid gap-2">
                <SignInButton 
                  postLoginSuccessUri={window.location.pathname}
                  onBeforeSignIn={closeOffcanvas}
                />
                <Link 
                  to={location.pathname === '/venues' ? '/venue-register' : '/register'} 
                  className="btn btn-danger w-100 text-decoration-none"
                  onClick={closeOffcanvas}
                >
                  {t('nav.signUp')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
