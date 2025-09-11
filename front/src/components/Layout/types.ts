/**
 * Props del componente MainLayout
 */
export interface MainLayoutProps {
    /** Contenido principal del layout */
    children?: React.ReactNode;
    /** Clases CSS adicionales */
    className?: string;
    /** Variante del footer (dark o light) */
    footerVariant?: "dark" | "light";
}

/**
 * Props del componente Header
 */
export interface HeaderProps {
    /** Título principal del header */
    title?: string;
    /** Mostrar botón de navegación móvil */
    showNavButton?: boolean;
    /** Callback para el click del botón de navegación */
    onNavClick?: () => void;
    /** Clases CSS adicionales */
    className?: string;
}

