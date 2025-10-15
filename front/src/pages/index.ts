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
export { default as RegisterPage } from './Register';
export { default as ConfirmationPage } from './Confirmation';

export { default as Dashboard } from './Dashboard';
export { default as ManualUsuario } from './ManualUsuario';

export { default as Alianza } from './Alianza';
export { default as Gobernanza } from './Gobernanza/index';
export { default as Gestion } from './Gestion';
export { default as Iniciativas } from './iniciativas';
