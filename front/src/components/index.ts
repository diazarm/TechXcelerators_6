/**
 * Exportaciones centralizadas de TODOS los componentes
 * 
 * Este archivo centraliza todas las exportaciones relacionadas con componentes
 * para facilitar los imports en otros archivos.
 * 
 * Organización por dominio:
 * - Document: Gestión de documentos
 * - Resource: Gestión de recursos
 * - User: Gestión de usuarios
 * - Alliance: Alianzas
 * - Search: Búsqueda
 * - Auth: Autenticación
 * - Form: Elementos de formularios
 * - Notification: Notificaciones
 * - Layout: Layout y navegación
 * - UI: Componentes UI reutilizables
 * - Shared: Componentes compartidos/globales
 * 
 * @example
 * ```tsx
 * // Importar componentes desde un solo lugar
 * import { 
 *   LoadingSpinner,
 *   Button,
 *   ErrorBoundary,
 *   UserManagement
 * } from '../components';
 * ```
 */

// ==================== DOCUMENT ====================
export { DocumentManagement } from './Document/DocumentManagement';
export { DocumentUploadModal } from './Document/DocumentUploadModal';
export { DocumentEditModal } from './Document/DocumentEditModal';
export { DocumentDeleteModal } from './Document/DocumentDeleteModal';
export { DocumentRestoreModal } from './Document/DocumentRestoreModal';
export { DocumentTableHeader, DocumentTableRow, DocumentTableEmpty } from './Document/DocumentTable';

// ==================== RESOURCE ====================
export { default as ResourceDropdown } from './Resource/ResourceDropdown';
export { ResourceEditModal } from './Resource/ResourceEditModal';
export { ResourceDeleteModal } from './Resource/ResourceDeleteModal';
export { ResourceRestoreModal } from './Resource/ResourceRestoreModal';
export type { ResourceDropdownProps } from './Resource/ResourceDropdown/types';

// ==================== USER ====================
export { UserManagement } from './User/UserManagement';
export { UserTableHeader, UserTableRow, UserTableEmpty } from './User/UserTable';
export { RoleChangeModal } from './User/RoleChangeModal';
export { UserStatusModal } from './User/UserStatusModal';

// ==================== ALLIANCE ====================
export { AllianceSelectionModal } from './Alliance/AllianceSelectionModal';
export { AllianceSlider } from './Alliance/AllianceSlider';

// ==================== SEARCH ====================
export { default as SearchBar } from './Search/SearchBar';
export { SearchModal } from './Search/SearchModal';
export { SectionFilter } from './Search/SectionFilter';
export type { SectionFilterProps, SectionOption } from './Search/SectionFilter/types';

// ==================== AUTH ====================
export { default as AuthGuard } from './Auth/AuthGuard';
export { LoginForm } from './Auth/LoginForm';
export { default as RegisterForm } from './Auth/RegisterForm';

// ==================== FORM ====================
export { Button } from './Form/Button';
export { FilterDropdown } from './Form/FilterDropdown';
export { default as ValidationErrors } from './Form/ValidationErrors';

// ==================== NOTIFICATION ====================
export { Notification } from './Notification';
export { NotificationContainer } from './Notification/NotificationContainer';

// ==================== LAYOUT ====================
export { default as MainLayout } from './Layout/MainLayout';
export { Header } from './Layout/header';
export { Navbar } from './Layout/navbar';
export { Footer } from './Layout/footer';

// ==================== UI ====================
export { default as Card } from './UI/Card';
export { default as CardGrid } from './UI/CardGrid';
export { CollapsibleSection } from './UI/CollapsibleSection';
export { default as ConfirmationPage } from './UI/ConfirmationPage';
export { default as HeroSection } from './UI/HeroSection';
export { default as LoadingSpinner } from './UI/LoadingSpinner';
export { PaginationControls } from './UI/PaginationControls';
export { OptimizedImage } from './UI/OptimizedImage';
export { ResponsiveImage, ResponsiveBackground } from './UI/ResponsiveImage';

// ==================== SHARED ====================
export { default as ErrorBoundary } from './Shared/ErrorBoundary';
