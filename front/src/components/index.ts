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
export { default as Card } from './Card';

// Componentes de formularios
export { LoginForm } from './LoginForm';
export { default as RegisterForm } from './RegisterForm';
export { default as ConfirmationPage } from './ConfirmationPage';

// Componentes de loading
export { default as LoadingSpinner } from './LoadingSpinner';

// Componentes de sistema
export { default as ErrorBoundary } from './ErrorBoundary';

// Componentes de error y validación
export { default as ValidationErrors } from './ValidationErrors';

// Componentes de notificaciones
export { Notification } from './Notification';
export { NotificationContainer } from './NotificationContainer';

// Componentes de modales
export { AllianceSelectionModal } from './AllianceSelectionModal';
export { ResourceEditModal } from './ResourceEditModal';
export { ResourceDeleteModal } from './ResourceDeleteModal';
export { ResourceRestoreModal } from './ResourceRestoreModal';
export { default as GalleryEditModal } from './GalleryEditModal';
export { default as GalleryDeleteModal } from './GalleryDeleteModal';

// Componentes específicos de galería
export { default as GalleryCard } from './GalleryCard';
export { default as GalleryCardGrid } from './GalleryCardGrid';

// Componentes de layout
export { default as MainLayout } from './Layout/MainLayout';
export { Header } from './Layout/header';
export { Navbar } from './Layout/navbar';
export { Footer } from './Layout/footer';
export { default as ResourceDropdown } from './ResourceDropdown';

// Componentes de hero section
export { default as HeroSection } from './HeroSection';

// Componentes de búsqueda
export { SearchModal } from './SearchModal';
export { default as SearchBar } from './SearchBar';

// Componentes de cards
export { default as CardGrid } from './CardGrid';

// Componentes de imágenes responsivas
export { ResponsiveImage, ResponsiveBackground } from './ResponsiveImage';

// Componentes de alianzas
export { AllianceSlider } from './AllianceSlider';

// Tipos de componentes
export type { ResourceDropdownProps } from './ResourceDropdown/types';

// Componentes de protección de rutas
export { default as AuthGuard } from './AuthGuard';

