
import { initOptions, keycloak, UserRole } from '@/config/keycloak';
import type Keycloak from 'keycloak-js';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface KeycloakContextType {
  keycloak: Keycloak;
  authenticated: boolean;
  initialized: boolean;
  user: {
    name?: string;
    email?: string;
    roles: UserRole[];
  } | null;
  hasRole: (role: UserRole) => boolean;
  hasAnyRequiredRole: (requiredRoles: UserRole[]) => boolean;
  login: (redirectUri?: string) => void;
  logout: () => void;
}

const KeycloakContext = createContext<KeycloakContextType | null>(null);

export const useKeycloak = () => {
  const context = useContext(KeycloakContext);
  if (!context) {
    throw new Error('useKeycloak must be used within a KeycloakProvider');
  }
  return context;
};

interface KeycloakProviderProps {
  children: ReactNode;
}

export const KeycloakProvider: React.FC<KeycloakProviderProps> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [user, setUser] = useState<KeycloakContextType['user']>(null);

  useEffect(() => {
    const initKeycloak = async () => {
      console.log('Initializing Keycloak...');

      try {
        const auth = await keycloak.init(initOptions);
        console.log('Keycloak initialized, authenticated:', auth);

        setAuthenticated(auth);
        setInitialized(true);

        if (auth && keycloak.tokenParsed) {
          const roles = keycloak.realmAccess?.roles || [];
          const clientRoles = keycloak.resourceAccess?.[keycloak.clientId]?.roles || [];
          const allRoles = [...roles, ...clientRoles];

          const userRoles = allRoles.filter((role): role is UserRole =>
            role === 'admin' || role === 'standard' || role === 'vacation-rental'
          );

          setUser({
            name: keycloak.tokenParsed.name || keycloak.tokenParsed.preferred_username,
            email: keycloak.tokenParsed.email,
            roles: userRoles,
          });

          console.log('User roles:', userRoles);
        }

        // Setup token refresh
        if (auth) {
          setInterval(() => {
            keycloak.updateToken(70).then((refreshed) => {
              if (refreshed) {
                console.log('Token refreshed');
              }
            }).catch(() => {
              console.log('Failed to refresh token');
              keycloak.login();
            });
          }, 60000);
        }

      } catch (error) {
        console.error('Keycloak initialization failed:', error);
        setInitialized(true);
      }
    };

    initKeycloak();
  }, []);

  const hasRole = (role: UserRole): boolean => {
    return user?.roles.includes(role) || false;
  };

  const hasAnyRequiredRole = (requiredRoles: UserRole[]): boolean => {
    if (!user?.roles || requiredRoles.length === 0) return false;
    return user.roles.some(userRole => requiredRoles.includes(userRole));
  };

  const login = (redirectUri?: string) => {
    const currentUrl = redirectUri || window.location.href;
    keycloak.login({ redirectUri: currentUrl });
  };

  const logout = () => {
    keycloak.logout({ redirectUri: window.location.origin });
  };

  const value: KeycloakContextType = {
    keycloak,
    authenticated,
    initialized,
    user,
    hasRole,
    hasAnyRequiredRole,
    login,
    logout,
  };

  if (!initialized) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-center text-zinc-200">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Authentication Loading...</h2>
          <p className="text-zinc-400">Initializing secure connection...</p>
        </div>
      </div>
    );
  }

  return (
    <KeycloakContext.Provider value={value}>
      {children}
    </KeycloakContext.Provider>
  );
};
