import type { User } from '../types';

/**
 * Permisos del usuario basados en isAdmin y role
 * Compatible con la lógica del backend
 */

export interface UserPermissions {
  canManageUsers: boolean;
  canDeleteResources: boolean;
  canRestoreResources: boolean;
  canAccessDashboard: boolean;
  canCreateUsers: boolean;
  canChangeRoles: boolean;
  canAccessAdminPanel: boolean;
  canAccessDirectorPanel: boolean;
}

/**
 * Obtener permisos del usuario basado en su rol y estado de admin
 * @param user - Usuario autenticado
 * @returns Permisos del usuario
 */
export const getUserPermissions = (user: User): UserPermissions => {
  return {
    // Solo admin puede gestionar usuarios
    canManageUsers: user.isAdmin,
    
    // Admin y director pueden eliminar recursos
    canDeleteResources: user.isAdmin || user.role === 'director',
    
    // Admin y director pueden restaurar recursos
    canRestoreResources: user.isAdmin || user.role === 'director',
    
    // Solo admin tiene acceso al dashboard
    canAccessDashboard: user.isAdmin,
    
    // Solo admin puede crear usuarios
    canCreateUsers: user.isAdmin,
    
    // Solo admin puede cambiar roles
    canChangeRoles: user.isAdmin,
    
    // Solo admin tiene acceso al panel de administración
    canAccessAdminPanel: user.isAdmin,
    
    // Admin y director tienen acceso al panel de director
    canAccessDirectorPanel: user.isAdmin || user.role === 'director',
  };
};

/**
 * Verificar si el usuario tiene un permiso específico
 * @param user - Usuario autenticado
 * @param permission - Permiso a verificar
 * @returns true si el usuario tiene el permiso
 */
export const hasPermission = (user: User, permission: keyof UserPermissions): boolean => {
  const permissions = getUserPermissions(user);
  return permissions[permission];
};

/**
 * Verificar si el usuario es administrador
 * @param user - Usuario autenticado
 * @returns true si el usuario es admin
 */
export const isAdmin = (user: User): boolean => {
  return user.isAdmin;
};

/**
 * Verificar si el usuario es director
 * @param user - Usuario autenticado
 * @returns true si el usuario es director
 */
export const isDirector = (user: User): boolean => {
  return user.role === 'director' && !user.isAdmin;
};

/**
 * Verificar si el usuario es staff (user o director)
 * @param user - Usuario autenticado
 * @returns true si el usuario es staff
 */
export const isStaff = (user: User): boolean => {
  return !user.isAdmin;
};

/**
 * Obtener el tipo de usuario para mostrar en la UI
 * @param user - Usuario autenticado
 * @returns Tipo de usuario para mostrar
 */
export const getUserTypeDisplay = (user: User): string => {
  if (user.isAdmin) {
    return 'Administrador';
  }
  if (user.role === 'director') {
    return 'Director';
  }
  return 'Usuario';
};
