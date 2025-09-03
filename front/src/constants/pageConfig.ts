/**
 * Configuración de Páginas
 * 
 * Configuración centralizada de títulos y subtítulos para el header dinámico.
 * Permite personalizar el contenido del header según la página actual.
 */

export interface PageConfig {
  title: string;
  subtitle: string;
}

export const PAGE_CONFIGS: Record<string, PageConfig> = {
  gobernanza: {
    title: 'GOBERNANZA ESTRATÉGICA',
    subtitle: 'Gestión y coordinación de comités, actas de reuniones y presentaciones estratégicas de la alianza.'
  },
  planeacion: {
    title: 'PLANEACIÓN ESTRATÉGICA',
    subtitle: 'Planificación financiera, presupuestos y estrategias de desarrollo institucional.'
  },
  gestion: {
    title: 'GESTIÓN OPERATIVA',
    subtitle: 'Tableros de control, calendarios y métricas para la gestión eficiente de proyectos.'
  },
  iniciativas: {
    title: 'INICIATIVAS ESTRATÉGICAS',
    subtitle: 'Planes de acción con las alianzas internas para el desarrollo y crecimiento institucional.'
  },
  alianza: {
    title: 'Impulsamos la educación virtual',
    subtitle: 'En esta plataforma digital podrás conectar con tus compañeros de trabajo, obtener información importante sobre la empresa, tu bienestar y agilizar procesos administrativos y corporativos.'
  },
  chatIA: {
    title: 'Asistente Virtual Inteligente',
    subtitle: 'Conecta con nuestra IA avanzada para resolver dudas, obtener información instantánea y recibir asistencia personalizada en tiempo real.'
  },
  galeria: {
    title: 'Galería de Momentos',
    subtitle: 'Explora nuestra colección de fotografías que capturan los mejores momentos, eventos y logros de nuestra organización y equipo.'
  }
};

/**
 * Obtener configuración de página por nombre
 * 
 * @param pageName - Nombre de la página (case-insensitive)
 * @returns Configuración de la página o null si no existe
 */
export const getPageConfig = (pageName: string): PageConfig | null => {
  return PAGE_CONFIGS[pageName.toLowerCase()] || null;
};
