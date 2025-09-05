/**
 * Exportaciones centralizadas de TODOS los componentes
 * 
 * Este archivo centraliza todas las exportaciones relacionadas con componentes
 * para facilitar los imports en otros archivos.
 * 
 * @example
 * ```tsx
 * // Importar componentes desde un solo lugar
 * import { 
 *   LoadingSpinner,
 *   Button,
 *   ErrorBoundary,
 *   Navigation
 * } from '../components';
 * ```
 */

// Componentes de UI básicos
export { Button } from './Button';

// Componentes de formularios
export { LoginForm } from './LoginForm';

// Componentes de loading
export { default as LoadingSpinner } from './LoadingSpinner';

// Componentes de sistema
export { default as ErrorBoundary } from './ErrorBoundary';

// Componentes de error y validación
export { default as ValidationErrors } from './ValidationErrors';

// Componentes de notificaciones
export { Notification } from './Notification';
export { NotificationContainer } from './NotificationContainer';

// Componentes de layout
export { default as MainLayout } from './Layout/MainLayout';
export { Header } from './Layout/header';
export { Navbar } from './Layout/navbar';
export { Footer } from './Layout/footer';

// Componentes de hero section
export { default as HeroSection } from './HeroSection';

// Componentes de búsqueda
export { SearchModal } from './SearchModal';

