
import Keycloak from 'keycloak-js';

export const keycloakConfig = {
  url: 'https://idp.0l5en.de',
  realm: 'lovable',
  clientId: 'lovable',
};

export const keycloak = new Keycloak(keycloakConfig);

export const initOptions = {
  onLoad: 'check-sso' as const,
  silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
  pkceMethod: 'S256' as const,
  checkLoginIframe: false,
};

export type UserRole = 'admin' | 'standard';

export const REQUIRED_ROLES: UserRole[] = ['admin', 'standard'];
