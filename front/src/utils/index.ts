/**
 * Exportación centralizada de todas las utilidades del proyecto
 * 
 * Este archivo centraliza la exportación de utilidades para mantener
 * consistencia con el patrón de importación del resto del proyecto.
 * 
 * @example
 * ```tsx
 * // ✅ CORRECTO - Importación centralizada
 * import { getUserPermissions, hasPermission, isAdmin } from '../../utils';
 * 
 * // ❌ INCORRECTO - Importación directa
 * import { getUserPermissions } from '../../utils/permissions';
 * ```
 */

export * from './permissions';
