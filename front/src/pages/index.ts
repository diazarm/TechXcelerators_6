/**
 * Exportaciones centralizadas de TODAS las páginas
 * 
 * Este archivo centraliza todas las exportaciones relacionadas con páginas
 * para facilitar los imports en otros archivos.
 * 
 * @example
 * ```tsx
 * // Importar páginas desde un solo lugar
 * import { 
 *   WelcomePage,
 *   Contact,
 *   LoginPage
 * } from '../pages';
 * ```
 */

// Exportaciones de páginas
export { default as Home } from './Home';
export { default as LoginPage } from './Login';

export * from './Resources';
export { default as Dashboard } from './Dashboard';

