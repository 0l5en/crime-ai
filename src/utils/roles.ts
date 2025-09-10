
import { UserRole } from '@/config/keycloak';

export const roleHierarchy: Record<UserRole, number> = {
  admin: 3,
  standard: 2,
  'vacation-rental': 1,
};

export const hasPermission = (userRoles: UserRole[], requiredRole: UserRole): boolean => {
  if (userRoles.includes('admin')) return true;
  return userRoles.includes(requiredRole);
};

export const hasAnyRole = (userRoles: UserRole[], requiredRoles: UserRole[]): boolean => {
  return requiredRoles.some(role => hasPermission(userRoles, role));
};

export const getHighestRole = (userRoles: UserRole[]): UserRole | null => {
  if (userRoles.length === 0) return null;
  
  return userRoles.reduce((highest, current) => {
    return roleHierarchy[current] > roleHierarchy[highest] ? current : highest;
  });
};

export const canAccessVacationRental = (userRoles: UserRole[]): boolean => {
  return hasAnyRole(userRoles, ['admin', 'vacation-rental']);
};
