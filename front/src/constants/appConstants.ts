/**
 * Constantes globales de la aplicación
 * 
 * Este archivo centraliza todas las constantes que se utilizan en toda la aplicación.
 * Cambiar valores aquí afectará a toda la aplicación, así que úsalo con cuidado.
 * 
 * @example
 * ```tsx
 * import { APP_NAME, API_ENDPOINTS, ROUTES } from '@/constants/appConstants';
 * 
 * // Usar en componentes
 * <h1>{APP_NAME}</h1>
 * 
 * // Usar en servicios
 * const response = await fetch(API_ENDPOINTS.BASE_URL + API_ENDPOINTS.USERS);
 * 
 * // Usar en navegación
 * navigate(ROUTES.DASHBOARD);
 * ```
 */

/**
 * Nombre de la aplicación
 * Se usa en títulos, headers y branding
 */
export const APP_NAME = 'TechXcelerators';

/**
 * Versión actual de la aplicación
 * Útil para debugging y control de versiones
 */
export const APP_VERSION = '1.0.0';

/**
 * Endpoints de la API
 * Centraliza todas las URLs de la API para fácil mantenimiento
 * 
 * @example
 * ```tsx
 * // Construir URL completa
 * const loginUrl = API_ENDPOINTS.BASE_URL + API_ENDPOINTS.AUTH + '/login';
 * 
 * // Con fetch
 * const response = await fetch(loginUrl, {
 *   method: 'POST',
 *   body: JSON.stringify(credentials)
 * });
 * ```
 */
export const API_ENDPOINTS = {
  /** URL base de la API (desde variables de entorno o localhost por defecto) */
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  /** Endpoint base para autenticación */
  AUTH: '/auth',
  /** Endpoint base para operaciones de usuarios */
  USERS: '/users',
  /** Endpoint base para operaciones de proyectos */
  PROJECTS: '/projects',
} as const;

/**
 * Rutas de la aplicación
 * Centraliza todas las rutas para evitar hardcoding en componentes
 * 
 * @example
 * ```tsx
 * import { ROUTES } from '@/constants/appConstants';
 * 
 * // En navegación
 * navigate(ROUTES.DASHBOARD);
 * 
 * // En enlaces
 * <Link to={ROUTES.HOME}>Inicio</Link>
 * 
 * // En redirecciones
 * if (!isAuthenticated) {
 *   navigate(ROUTES.LOGIN);
 * }
 * ```
 */
export const ROUTES = {
  /** Página principal de la aplicación */
  HOME: '/',
  /** Página de inicio de sesión */
  LOGIN: '/login',
  /** Página de registro de usuarios */
  REGISTER: '/register',
  /** Página del dashboard principal */
  DASHBOARD: '/dashboard',
} as const;

/**
 * Configuración de la aplicación
 * Valores que pueden cambiar según el entorno
 */
export const APP_CONFIG = {
  /** Tiempo de expiración del token en milisegundos (24 horas) */
  TOKEN_EXPIRY: 24 * 60 * 60 * 1000,
  /** Número máximo de reintentos para operaciones de API */
  MAX_RETRIES: 3,
  /** Tiempo de timeout para operaciones de API en milisegundos */
  API_TIMEOUT: 10000,
} as const;

/**
 * Mensajes de error estándar
 * Centraliza mensajes de error para consistencia en la UI
 */
export const ERROR_MESSAGES = {
  /** Error genérico de red */
  NETWORK_ERROR: 'Error de conexión. Verifica tu internet e intenta de nuevo.',
  /** Error de autenticación */
  AUTH_ERROR: 'Credenciales inválidas. Verifica tu email y contraseña.',
  /** Error de permisos */
  PERMISSION_ERROR: 'No tienes permisos para realizar esta acción.',
  /** Error de validación */
  VALIDATION_ERROR: 'Los datos ingresados no son válidos. Revisa el formulario.',
} as const;
