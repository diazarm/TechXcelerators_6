/**
 * Tipos específicos para la página WelcomePage
 * 
 * Este archivo demuestra cómo organizar tipos específicos de una página
 * siguiendo la estructura del proyecto.
 */

export interface TeamMember {
  /** Nombre del miembro del equipo */
  name: string;
  /** Rol o función del miembro */
  role: string;
  /** Emoji o avatar del miembro */
  avatar: string;
}

export interface Feature {
  /** Título de la característica */
  title: string;
  /** Descripción de la característica */
  description: string;
  /** Icono o emoji representativo */
  icon: string;
}

/**
 * Props del componente WelcomePage (si fuera necesario)
 */
export interface WelcomePageProps {
  /** Título personalizado de la página */
  customTitle?: string;
  /** Si mostrar o no la sección del equipo */
  showTeam?: boolean;
}
