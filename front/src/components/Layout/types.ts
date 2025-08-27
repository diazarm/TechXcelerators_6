/**
 * Props del componente MainLayout
 */
export interface MainLayoutProps {
    /** Contenido principal del layout */
    children?: React.ReactNode;
    /** Clases CSS adicionales */
    className?: string;
}

/**
 * Props del componente Header
 */
export interface HeaderProps {
    /** Título principal del header */
    title?: string;
    /** Subtítulo opcional */
    subtitle?: string;
    /** Si mostrar el botón de navegación */
    showNavButton?: boolean;
    /** Función que se ejecuta al hacer click en el botón de navegación */
    onNavClick?: () => void;
    /** Clases CSS adicionales */
    className?: string;
}