
import { UserRole } from '@/config/keycloak';
import { useKeycloak } from '@/contexts/KeycloakContext';
import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
  fallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles = ['admin', 'standard'],
  fallback
}) => {
  const { authenticated, user, hasAnyRequiredRole, login } = useKeycloak();

  if (!authenticated) {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center" style={{ maxWidth: '28rem' }}>
          <div
            className="d-flex align-items-center justify-content-center mx-auto mb-4 bg-primary-custom rounded-circle"
            style={{ width: '4rem', height: '4rem' }}
          >
            <i className="bi bi-lock-fill" style={{ fontSize: '2rem' }}></i>
          </div>
          <h2 className="h2 fw-bold mb-3">Authentication Required</h2>
          <p className="text-secondary mb-4">
            You need to be logged in to access this content. Please sign in to continue.
          </p>
          <button
            onClick={() => login(window.location.href)}
            className="btn btn-primary btn-lg px-4 py-2 fw-semibold"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  if (authenticated && !hasAnyRequiredRole(requiredRoles)) {
    return fallback || (
      <div className="vh-100 bg-dark d-flex align-items-center justify-content-center">
        <div className="text-center text-light" style={{ maxWidth: '28rem' }}>
          <div
            className="d-flex align-items-center justify-content-center mx-auto mb-4 bg-warning rounded-circle"
            style={{ width: '4rem', height: '4rem' }}
          >
            <i className="bi bi-exclamation-triangle-fill text-dark" style={{ fontSize: '2rem' }}></i>
          </div>
          <h2 className="h2 fw-bold mb-3">Access Denied</h2>
          <p className="text-secondary mb-3">
            You don't have the required permissions to access this content.
          </p>
          <p className="small text-muted mb-4">
            Required roles: {requiredRoles.join(', ')}
            <br />
            Your roles: {user?.roles.join(', ') || 'None'}
          </p>
          <button
            onClick={() => window.history.back()}
            className="btn btn-secondary btn-lg px-4 py-2 fw-semibold"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
