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
    /** Subtítulo del header */
    subtitle?: string;
    /** Clases CSS adicionales */
    className?: string;
}

